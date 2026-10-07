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

        if (dto.transactionType == "upload") {
            Console.WriteLine($"Received file byte array: {dto.fileName}");
            var file = Convert.FromBase64String(dto.fileData);
            File.WriteAllBytes($"{userEquipmentImageDirectory}\\{dto.imageCategory}\\{dto.fileName}", file);
            return "";
        } else {
            var file = Convert.ToBase64String(File.ReadAllBytes($"{userEquipmentImageDirectory}\\{dto.imageCategory}\\{dto.fileName}"));
            return file;
        }
    }
}