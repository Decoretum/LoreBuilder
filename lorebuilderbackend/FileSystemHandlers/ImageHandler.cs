namespace FileSystemHandlers;

public class ImageHandler : IimageHandler
{
    private readonly static string appDirectory = Environment.GetEnvironmentVariable("LOREBUILDER_DATA_DIR") 
        ?? Directory.GetParent(Directory.GetCurrentDirectory().ToString())!.ToString();
    private readonly string equipmentDirectory = Path.Combine(appDirectory, "equipment");
    public Dictionary<string, List<string>> getEquipmentFiles(string equipmentType) 
    {
        Console.WriteLine(equipmentDirectory);
        var files = new Dictionary<string, List<string>>();
        var designatedDirectory = Path.Combine(equipmentDirectory, equipmentType);
        var equipmentFilesArray = Directory.GetFiles(designatedDirectory);

        foreach (var i in equipmentFilesArray)
        {
            var fileNameArray = i.Split("\\")[^1].Split("_");
            var uuid = fileNameArray[1];
            var fileName = fileNameArray[2];

            if (!files.ContainsKey(uuid))
            {
                var fileArray = new List<string>{ fileName };
                files.Add(uuid, fileArray);
            }
            else files[uuid].Add(fileName);
            
        }

        return files;
    }
}