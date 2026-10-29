namespace FileSystemHandlers;

public interface IimageHandler
{
    Dictionary<string, List<string>> getEquipmentFiles(string equipmentType);
}