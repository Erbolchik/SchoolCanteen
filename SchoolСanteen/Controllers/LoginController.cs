using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SchoolСanteen.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SchoolСanteen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DbConnection _db;
        private readonly IConfiguration _config;


        public LoginController(DbConnection dbContext,
                               IConfiguration config)
        {
            _db = dbContext;
            _config = config;
        }

        [HttpPost]
        public IActionResult Login([FromBody] Users loggedUser)
        {
            IActionResult response = Unauthorized();
            UserModel userModel = new UserModel();
            var user = Authenticate(loggedUser);
            if (user != null)
            {
                var token = GenerateJWTToken(user);
                response = Ok(new { token });
            }
            return response;

        }

        private UserModel Authenticate(Users loggedUser)
        {
            try
            {
                UserModel user = null;
                if (_db.Users.Any(m => m.Username == loggedUser.Username.ToLower() && m.HashPassword == loggedUser.HashPassword))
                {
                    Users u = _db.Users.FirstOrDefault(m => m.Username == loggedUser.Username.ToLower() && m.HashPassword == loggedUser.HashPassword);
                    int? rolesId = u.RoleId;
                    string role = _db.Roles.FirstOrDefault(m => m.Id == rolesId).Value;


                    _db.SaveChanges();
                    user = new UserModel()
                    {
                        Id = u.Id,
                        Email = u.Email,
                        Username = u.Username,
                        RoleName = u.Roles.Name,
                        Roles = u.Roles
                    };
                }
                return user;
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        private string GenerateJWTToken(UserModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["AuthOptions:SignInKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimsIdentity.DefaultRoleClaimType,user.RoleName),
            };

            var token = new JwtSecurityToken(
            issuer: _config["AuthOptions:Issuer"],
            audience: _config["AuthOptions:Issuer"],
            claims,
            expires: DateTime.Now.AddMinutes(480),
            signingCredentials: credentials
            );
            var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodeToken;
        }
    }
}
