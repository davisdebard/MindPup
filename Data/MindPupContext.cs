using Microsoft.EntityFrameworkCore;

namespace mindpup.Data
{
  public class MindPupContext : DbContext
  {
    public MindPupContext(DbContextOptions<MindPupContext> options)
          : base(options) { }
    public MindPupContext() { }
    public DbSet<MindPup> MindPup { get; set; }
  }
}
