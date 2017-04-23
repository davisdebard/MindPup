using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using mindpup.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mindpup.Controllers
{
    [Produces("application/json")]
    [Route("api/MindPupAPI")]
    public class MindPupAPI : Controller
    {
        private readonly mindPupContext _context;

        public MindPupAPI (mindPupContext context)
        {
            _context = context;
        }

    // GET: api/MindPupAPI/Contact

    [HttpGet]
    [Route("Contact")]
    public IEnumerable<MindPupAPI> GetMindPup()
    {
      IEnumerable<MindPupAPI> _retArray = _context.MindPup as IEnumerable<MindPupAPI>;
      return _retArray;
    }
  }
}
