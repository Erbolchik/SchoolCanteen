using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;
using SchoolСanteen.Models;
using SchoolСanteen.Models.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolСanteen.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DbConnection _db;
        private readonly IConfiguration _config;

        public UserController(DbConnection dbContext, IConfiguration config)
        {
            _db = dbContext;
            _config = config;
        }

        [HttpGet]
        public IEnumerable<Users> GetUsers()
        {
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var role = JWTHelper.GetUserRole(token, _config["AuthOptions:SignInKey"]);
            var login = JWTHelper.GetUserLogin(token, _config["AuthOptions:SignInKey"]);
            return _db.Users.ToList();
        }
    }
}
