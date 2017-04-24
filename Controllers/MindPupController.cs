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
        private readonly MindPupContext _context;

        public MindPupAPI (MindPupContext context)
        {
            _context = context;
        }

    // GET: api/MindPupAPI/contact

    [HttpGet]
    [Route("contact")]
    public IEnumerable<MindPup> GetMindPup()
    {
      IEnumerable<MindPup> _retArray = _context.MindPup as IEnumerable<MindPup>;
      return _retArray;
    }
  }
}
