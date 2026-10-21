using System.Net;
using lorebuilderbackend.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Controller;

[Route("api/ImageController")]
[ApiController]
public class ImageController 
{
    private static DirectoryInfo parentDirectory = Directory.GetParent(Directory.GetCurrentDirectory())!;
    private static string userEquipmentImageDirectory = parentDirectory + "\\equipment\\";
    private static string[] multipleImages = new string[]{ "accessories", "mainHandWeapon", "offHandWeapon" };

    // keyWord = uuid
    public string checkIfFileExists(string[] directoryFiles, string keyWord) {
        var resultArr = "";
        for (int i = 0; i <= directoryFiles.Length - 1; i++) {
            var filePrefix = directoryFiles[i].Split("\\")[^1].Split("_")[1];
            if (filePrefix == keyWord)
            {
                resultArr = directoryFiles[i];
                break;
            }
        }
        return resultArr;
    }

    [HttpPost("GetByteArray")]
    async public Task<string> extractFileByteArray([FromBody] ImageDTO dto) 
    {
        string stringResult;
        string directoryPath;

        var chosenEquipmentDirectory = $"{userEquipmentImageDirectory}\\{dto.imageCategory}\\";
        var directoryFiles = Directory.GetFiles(chosenEquipmentDirectory);

        if (dto.transactionType == "upload") {
            stringResult = "";
            Task writeTask;
            var file = Convert.FromBase64String(dto.fileData);

            // There is an existing file for non-multi image equipment
            if (!multipleImages.Contains(dto.imageCategory)) {
                directoryPath = $"{chosenEquipmentDirectory}\\{dto.fileName}";
                writeTask = File.WriteAllBytesAsync(directoryPath, file);
                if (directoryFiles.Length == 1)
                {
                    var oldFileName = directoryFiles[0];
                    File.Delete($"{oldFileName}");
                    stringResult = oldFileName.Split("\\")[^1];
                }
            } 
            
            // Upload for multi-image equipment 
            else {
                var uuid = Guid.NewGuid().ToString();
                directoryPath = $"{chosenEquipmentDirectory}\\{dto.imageCategory}_{dto.uuid}_{dto.fileName}";
                writeTask = File.WriteAllBytesAsync(directoryPath, file);
                stringResult = uuid;
                
                // Saving a new multi-image equipment
                // TODO: Edit this to check if we are replacing
                if (dto.uuid != null) {
                    var fileExists = checkIfFileExists(directoryFiles, dto.uuid);
                    if (fileExists != "") {
                        File.Delete(fileExists);
                        stringResult = dto.uuid;
                    }
                } 
            }
            await writeTask;
            
        } else {
            // File retrieval for a multi-image equipment
            // TODO: implement operations before awaiting the Task
            Task<byte[]> fileBytes;
            if (multipleImages.Contains(dto.imageCategory)) {
                fileBytes = File.ReadAllBytesAsync($"{chosenEquipmentDirectory}\\{dto.imageCategory}_{dto.uuid}_{dto.fileName}");
            } 
            else {
                fileBytes = File.ReadAllBytesAsync($"{chosenEquipmentDirectory}\\{dto.fileName}");
            }
            stringResult = Convert.ToBase64String(await fileBytes);
        }
        return stringResult;
    }

    [HttpDelete("DeleteImage/{imageCategory}/{imageFileName}")]
    public string deleteImage([FromRoute] string imageCategory, string imageFileName) 
    {
        var stringResult = string.Empty;
        var chosenEquipmentDirectory = $"{userEquipmentImageDirectory}\\{imageCategory}\\";
        var directoryFilesArray = Directory.GetFiles(chosenEquipmentDirectory)[0].Split("\\");
        var directoryFileName = directoryFilesArray[^1];

        // Validate image
        var isCorrectFile = directoryFileName == imageFileName;
        if (isCorrectFile) {
            File.Delete($"{chosenEquipmentDirectory}\\{imageFileName}");
        }

        return stringResult;
    } 
}