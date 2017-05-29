using System.ComponentModel.DataAnnotations;

namespace mindpup.Data
{
    public class Contacts
    {
    [Key]
    public int ContactId { get; set; }

    [Required]
    [Display(Name ="Address Line 1")]
    public string AddressLine1 { get; set; }
    [Required]
    [Display(Name = "Address Line 2")]
    public string AddressLine2 { get; set; }
    [Display(Name = "Address Line 3")]
    public string AddressLine3 { get; set; }

    [Required]
    [Display(Name = "Contact Name")]
    public string ContactName { get; set; }

    [Required]
    [Display(Name = "Email")]
    public string EmailMain { get; set; }

    [Required]
    [Display(Name = "Phone")]
    public string PhoneMain { get; set; }
  }
}
