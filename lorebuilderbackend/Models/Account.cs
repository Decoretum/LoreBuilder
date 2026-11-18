

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Account
{
    [Key]
    public int id { get; set; }

    [Column(TypeName = "varchar(20)")]
    public string username { get; set; }

    [Column(TypeName = "varchar(20)")]
    public string password { get; set; }

    public DateTime dateOfBirth { get; set; }
}