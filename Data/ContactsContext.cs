using Microsoft.EntityFrameworkCore;

namespace mindpup.Data
{
  public class ContactsContext : DbContext
  {
    public ContactsContext(DbContextOptions<ContactsContext> options)
          : base(options) { }
    public ContactsContext() { }
    public DbSet<Contacts> Contacts { get; set; }
  }
}
