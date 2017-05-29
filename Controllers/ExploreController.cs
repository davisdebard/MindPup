using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using mindpup.Data;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mindpup.Controllers
{
  [Produces("application/json")]
  [Route("api/ExploreAPI")]
  public class ExploreAPI : Controller
  {
    private readonly GamesContext _context;
   
    public ExploreAPI(GamesContext context)
    {
      _context = context;
    }

    // GET: api/ExploreAPI/Games

    [HttpGet]
    [Route("Games")]
    public IEnumerable<Games> getGames()
    {
      IEnumerable<Games> _retArray = _context.Games as IEnumerable<Games>;
      return _retArray;
    }
  }
}
