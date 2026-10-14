using lorebuilderbackend.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Controller;

[Route("api/ImageController")]
[ApiController]
public class ImageController 
{
    private static DirectoryInfo parentDirectory = Directory.GetParent(Directory.GetCurrentDirectory())!;
    private static string userEquipmentImageDirectory = parentDirectory + "\\equipment\\";
    private static string[] noReplacementImages = new string[]{ "accessories", "mainhand", "offhand" };

    // keyWord = chestGear, rightArmGear, headGear 
    public string checkIfFileExists(string[] directoryFiles, string keyWord) {
        var resultArr = "";
        for (int i = 0; i <= directoryFiles.Length - 1; i++) {
            var filePrefix = directoryFiles[i].Split("\\")[^1].Split("_")[0];
            if (filePrefix == keyWord)
            {
                resultArr = directoryFiles[i];
                break;
            }

        }
        return resultArr;
    }

    [HttpPost("GetByteArray")]
    public string extractFileByteArray([FromBody] ImageDTO dto) 
    {
        string stringResult;
        string directoryPath;

        if (dto.transactionType == "upload") {
            stringResult = "";
            directoryPath = "";

            // Check first if current directory has existing file
            var chosenEquipmentDirectory = $"{userEquipmentImageDirectory}\\{dto.imageCategory}\\";
            var directoryFiles = Directory.GetFiles(chosenEquipmentDirectory);

            // There is an existing file for the equipment
            if (directoryFiles.Length == 1 && !noReplacementImages.Contains(dto.imageCategory)) {
                var oldFileName = directoryFiles[0];
                File.Delete($"{oldFileName}");
                stringResult = oldFileName.Split("\\")[^1];
                directoryPath = $"{chosenEquipmentDirectory}\\{dto.fileName}";
            } else if (directoryFiles.Length > 1 && noReplacementImages.Contains(dto.imageCategory)) {
                // Check if we're replacing a file
                directoryPath = $"{chosenEquipmentDirectory}\\{dto.imageCategory}_{dto.fileName}";
                var fileExists = checkIfFileExists(directoryFiles, dto.imageCategory);
                if (fileExists != "") {
                    File.Delete(fileExists);
                }
            }
            var file = Convert.FromBase64String(dto.fileData);
            File.WriteAllBytes(directoryPath, file);
        } else {
            stringResult = Convert.ToBase64String(File.ReadAllBytes($"{userEquipmentImageDirectory}\\{dto.imageCategory}\\{dto.fileName}"));
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