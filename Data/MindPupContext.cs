using Microsoft.EntityFrameworkCore;

namespace mindpup.Data
{
  public class mindPupContext : DbContext
  {
    public mindPupContext(DbContextOptions<mindPupContext> options)
          : base(options) { }
    public mindPupContext() { }
    public DbSet<MindPup> MindPup { get; set; }
  }
}
