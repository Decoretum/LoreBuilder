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
                stringResult = oldFileName.Split("\\")[oldFileName.Split("\\").Length - 1];
                directoryPath = $"{chosenEquipmentDirectory}\\{dto.fileName}";
            } else if (directoryFiles.Length > 1 && noReplacementImages.Contains(dto.imageCategory)) {
                directoryPath = $"{chosenEquipmentDirectory}\\{dto.imageCategory}_{dto.fileName}";
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
        var directoryFileName = directoryFilesArray[directoryFilesArray.Length - 1];

        // Validate image
        var isCorrectFile = directoryFileName == imageFileName;
        if (isCorrectFile) {
            Console.WriteLine("Deleting Image");
            File.Delete($"{chosenEquipmentDirectory}\\{imageFileName}");
        }

        return stringResult;
    } 
}