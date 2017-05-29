using Microsoft.EntityFrameworkCore;

namespace mindpup.Data
{
  public class GamesContext : DbContext
  {
    public GamesContext(DbContextOptions<GamesContext> options)
          : base(options) { }
    public GamesContext() { }
    public DbSet<Games> Games { get; set; }
  }
}
