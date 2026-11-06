using FileSystemHandlers;
using lorebuilderbackend.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[Route("api/ImageController")]
[ApiController]
public class ImageController
{
    public static readonly string parentDirectory = Environment.GetEnvironmentVariable("LOREBUILDER_DATA_DIR") != null 
        ? Directory.GetCurrentDirectory()
        : Directory.GetParent(Directory.GetCurrentDirectory().ToString())!.ToString();
    private static string userEquipmentImageDirectory = Path.Combine(parentDirectory, "equipment");
    private static string[] multipleImages = { "accessories", "mainHandWeapon", "offHandWeapon" };
    private IimageHandler imageHandler;

    public ImageController(IimageHandler ImageHandler)
    {
        imageHandler = ImageHandler;
    }

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

    [HttpGet("GetFiles/{imageCategory}")]
    async public Task<Dictionary<string, List<string>>> extractImageFilesHashMap([FromRoute] string imageCategory)
    {
        Dictionary<string, List<string>> files = imageHandler.getEquipmentFiles(imageCategory);
        return files;
    }

    [HttpPost("GetByteArray")]
    async public Task<string> extractFileByteArray([FromBody] ImageDTO dto) 
    {
        string stringResult;
        string directoryPath;

        var chosenEquipmentDirectory = Path.Combine(userEquipmentImageDirectory, dto.imageCategory);
        var directoryFiles = Directory.GetFiles(chosenEquipmentDirectory);

        if (dto.transactionType == "upload") {
            stringResult = "";
            Task writeTask;
            var file = Convert.FromBase64String(dto.fileData);

            // There is an existing file for non-multi image equipment
            if (!multipleImages.Contains(dto.imageCategory)) {
                directoryPath = Path.Combine(chosenEquipmentDirectory, dto.fileName);
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
                directoryPath = Path.Combine(chosenEquipmentDirectory, dto.imageCategory + "_", dto.uuid + "_", dto.fileName);
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
                fileBytes = File.ReadAllBytesAsync(Path.Combine(chosenEquipmentDirectory, dto.imageCategory + "_", dto.uuid + "_", dto.fileName));
            } 
            else {
                fileBytes = File.ReadAllBytesAsync(Path.Combine(chosenEquipmentDirectory, dto.fileName));
            }
            stringResult = Convert.ToBase64String(await fileBytes);
        }
        return stringResult;
    }

    [HttpDelete("DeleteImage/{imageCategory}/{imageFileName}")]
    public string deleteImage([FromRoute] string imageCategory, string imageFileName) 
    {
        var stringResult = string.Empty;
        var chosenEquipmentDirectory = Path.Combine(userEquipmentImageDirectory, imageCategory);
        var directoryFilesArray = Directory.GetFiles(chosenEquipmentDirectory)[0].Split("\\");
        var directoryFileName = directoryFilesArray[^1];

        // Validate image
        var isCorrectFile = directoryFileName == imageFileName;
        if (isCorrectFile) {
            File.Delete(Path.Combine(chosenEquipmentDirectory, imageFileName));
        }

        return stringResult;
    } 
}