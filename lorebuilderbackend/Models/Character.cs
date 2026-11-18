

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ValueGeneration;
public class Character
{
    [Key]
    public int id {get; set;}

    public Account account { get; set; }

    [Column(TypeName ="varchar(20)")]
    public string name { get; set; }

    [Column(TypeName ="varchar(10)")]
    public string title { get; set; }

    [Column(TypeName ="varchar(10)")]
    public string subtitle { get; set; }

    [Column(TypeName ="text")]
    public string hobbies { get; set; }

    [Column(TypeName ="text")]
    public string personality { get; set; }

    [Column(TypeName ="text")]
    public string physicalInfo { get; set; }

    [Column(TypeName ="text")]
    public string magic { get; set; }

    [Column(TypeName ="text")]
    public string skills { get; set; }

    [Column(TypeName ="text")]
    public string strength { get; set; }

    public occupationArrayDetails occupationDetails { get; set; }

    public MainHandArrayDetails weaponMainhand { get; set; }
    public OffHandArrayDetails weaponOffHand { get; set; }

    [Column(TypeName = "varchar[]")]
    public List<string> images { get; set; }

    [Column(TypeName = "varchar[]")]
    public List<string> leftArmGear { get; set; }

    [Column(TypeName = "varchar[]")]
    public List<string> rightArmGear { get; set; }

    [Column(TypeName = "varchar[]")]
    public List<string> chestArmGear { get; set; }

    [Column(TypeName = "varchar[]")]
    public List<string> backGear { get; set; }

    [Column(TypeName = "varchar[]")]
    public List<string> leggingGear { get; set; }

    [Column(TypeName = "varchar[]")]
    public List<string> footGear { get; set; }

    public class occupationArrayDetails
    {
        public List<BasicInfo> data { get; set; }
    }
    public class MainHandArrayDetails
    {
        public List<WeaponInfo> data { get; set; }
    }

    public class OffHandArrayDetails
    {
        public List<WeaponInfo> data { get; set; }
    }

    public class BasicInfo
    {
        public string name { get; set; }
        public string description { get; set; }
    }

    public class WeaponInfo
    {
        public string uuid { get; set; }
        public List<string> data { get; set; }
    }
}