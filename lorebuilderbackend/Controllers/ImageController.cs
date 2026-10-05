using lorebuilderbackend.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Controller;

[Route("api/ImageController")]
[ApiController]
public class ImageController 
{
    [HttpPost("GetByteArray")]
    public byte[] extractFileByteArray([FromBody] ImageDTO dto) 
    {
        Console.WriteLine($"Received filename: {dto.filePath}");
        byte[] bytes = File.ReadAllBytes(dto.filePath);
        return bytes;
    }
}