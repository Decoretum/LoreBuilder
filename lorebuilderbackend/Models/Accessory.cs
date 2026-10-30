using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Accessory 
{
    [Key]
    public int id { get; set; }

    [Column(TypeName ="varchar(20)")]
    public string name { get; set; }

    [Column(TypeName ="text")]
    public string description { get; set; }

    [Column(TypeName ="varchar[]")]
    public string[] fileNames { get; set; }
}