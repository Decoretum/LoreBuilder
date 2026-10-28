public class ImageHandler : IimageHandler
{
    private static string appDirectory = $"{Directory.GetParent(Directory.GetCurrentDirectory()).ToString()}";
    private static string equipmentDirectory = $"{appDirectory}\\equipment";
    public Dictionary<string, string> getEquipmentFiles(string equipmentType) 
    {
        var files = new Dictionary<string, string>();
        var designatedDirectory = $"{equipmentDirectory}\\{equipmentType}";
        var equipmentFilesArray = Directory.GetFiles(designatedDirectory);

        foreach (var i in equipmentFilesArray)
        {
            var fileNameArray = i.Split("\\")[^1].Split("_");
            var uuid = fileNameArray[1];
            var fileName = fileNameArray[2];
            files.Add(uuid, fileName);
            Console.WriteLine($"{uuid}-{fileName}");
        }
        return files;
    }
}