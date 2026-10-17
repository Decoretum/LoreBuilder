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
    private static string[] multipleImages = new string[]{ "accessories", "mainhand", "offhand" };

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

        // Check first if current directory has existing file
        var chosenEquipmentDirectory = $"{userEquipmentImageDirectory}\\{dto.imageCategory}\\";
        var directoryFiles = Directory.GetFiles(chosenEquipmentDirectory);

        if (dto.transactionType == "upload") {
            stringResult = "";
            directoryPath = "";

            // There is an existing file for non-multi image equipment
            if (!multipleImages.Contains(dto.imageCategory)) {
                if (directoryFiles.Length == 1)
                {
                    var oldFileName = directoryFiles[0];
                    File.Delete($"{oldFileName}");
                    stringResult = oldFileName.Split("\\")[^1];
                }
                directoryPath = $"{chosenEquipmentDirectory}\\{dto.fileName}";
            } 
            
            // Upload for multi-image equipment 
            else if (multipleImages.Contains(dto.imageCategory)) {
                var uuid = Guid.NewGuid().ToString();
                Console.WriteLine(dto.uuid);
                Console.WriteLine(dto.fileName);
                directoryPath = $"{chosenEquipmentDirectory}\\{dto.imageCategory}_{dto.uuid}_{dto.fileName}";
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
            var file = Convert.FromBase64String(dto.fileData);
            File.WriteAllBytes(directoryPath, file);
        } else {
            // File retrieval for a multi-image equipment
            if (multipleImages.Contains(dto.imageCategory)) {
                stringResult = Convert.ToBase64String(File.ReadAllBytes($"{chosenEquipmentDirectory}\\{dto.imageCategory}_{dto.uuid}_{dto.fileName}"));
            } 
            else {
                stringResult = Convert.ToBase64String(File.ReadAllBytes($"{chosenEquipmentDirectory}\\{dto.fileName}"));
            }
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
            Console.WriteLine("Deleting Image");
            File.Delete($"{chosenEquipmentDirectory}\\{imageFileName}");
        }

        return stringResult;
    } 
}