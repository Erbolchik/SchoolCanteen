using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolСanteen.Models.Utils
{
    public class JWTHelper
    {
        public static string GetUserRole(string token, string jwtSecretKey)
        {
            var key = Encoding.ASCII.GetBytes(jwtSecretKey);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            var claims = handler.ValidateToken(token, validations, out var tokenSecure);
            var userLogin = claims.Claims.ToList()[4].Value;

            return userLogin;
        }

        public static string GetUserLogin(string token, string jwtSecretKey)
        {
            var key = Encoding.ASCII.GetBytes(jwtSecretKey);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            var claims = handler.ValidateToken(token, validations, out var tokenSecure);
            var userLogin = claims.Claims.ToList()[0].Value;

            return userLogin;
        }
        public static string GetUserId(string token, string jwtSecretKey)
        {
            var key = Encoding.ASCII.GetBytes(jwtSecretKey);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            var claims = handler.ValidateToken(token, validations, out var tokenSecure);

            return claims.Claims.ToList()[2].Value;
        }
    }
}
