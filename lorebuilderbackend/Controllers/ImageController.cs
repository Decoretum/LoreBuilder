using lorebuilderbackend.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Controller;

[Route("api/ImageController")]
[ApiController]
public class ImageController 
{
    [HttpPost("GetByteArray")]
    public string extractFileByteArray([FromBody] ImageDTO dto) 
    {
        var parentDirectory = Directory.GetParent(Directory.GetCurrentDirectory());
        var userEquipmentImageDirectory = parentDirectory + "\\equipment\\";
        string stringResult;

        if (dto.transactionType == "upload") {
            stringResult = "";

            // Check first if current directory has existing file
            var chosenEquipmentDirectory = $"{userEquipmentImageDirectory}\\{dto.imageCategory}\\";
            var directoryFiles = Directory.GetFiles(chosenEquipmentDirectory);

            // There is an existing file for the equipment
            if (directoryFiles.Length == 1) {
                var oldFileName = directoryFiles[0];
                File.Delete(directoryFiles[0]);
                stringResult = oldFileName;
            }
            var file = Convert.FromBase64String(dto.fileData);
            File.WriteAllBytes($"{userEquipmentImageDirectory}\\{dto.imageCategory}\\{dto.fileName}", file);
        } else {
            stringResult = Convert.ToBase64String(File.ReadAllBytes($"{userEquipmentImageDirectory}\\{dto.imageCategory}\\{dto.fileName}"));
        }
        return stringResult;
    }
}