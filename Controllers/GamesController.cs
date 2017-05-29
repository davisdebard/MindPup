using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using mindpup.Data;
using System;

namespace mindpup.Controllers
{
  [Produces("application/json")]
  [Route("api/GamesAPI")]
  public class GamesAPI : Controller
  {
    private readonly GamesContext _context;

    public GamesAPI(GamesContext context)
    {
      _context = context;
    }

   // GET: api/GamesAPI/Games

    [HttpGet]
    [Route("Games")]
    public IEnumerable<Games> getGames()
    {
      IEnumerable<Games> _retArray = _context.Games as IEnumerable<Games>;
      return _retArray;
    }
  }
}
