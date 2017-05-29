using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using mindpup.Data;

namespace mindpup.Controllers
{
    [Produces("application/json")]
    [Route("api/ContactsAPI")]
    public class ContactsAPI : Controller
    {
        // Entity Framework Core works with "Context" objects defined in the /Data folder.
        private readonly ContactsContext _context;

        public ContactsAPI (ContactsContext context)
        {
            _context = context;
        }

    // GET: api/ContactsAPI/Contacts
    // Returns Contacts collection.
    [HttpGet]
    [Route("Contacts")]
    public IEnumerable<Contacts> getContacts()
    {
      IEnumerable<Contacts> _retArray = _context.Contacts as IEnumerable<Contacts>;
      return _retArray;
    }
  }
}
