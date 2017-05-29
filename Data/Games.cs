using System;
using System.ComponentModel.DataAnnotations;

namespace mindpup.Data
{
    public class Games
    {
    [Key]
    public int GameId { get; set; }

    [Required]
    [Display(Name ="Game Title")]
    public string Title { get; set; }

    [Display(Name = "Date Created")]
    public DateTime DateCreated { get; set; }

    [Display(Name = "Theme ID")]
    public int ThemeId { get; set; }

    [Display(Name = "User ID")]
    public int UserId { get; set; }

    public string zSystemUse { get; set; }
  }
}
