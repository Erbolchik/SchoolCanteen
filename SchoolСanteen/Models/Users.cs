using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolСanteen.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string HashPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime RegistraionDate { get; set; }
        public int RoleId { get; set; }

        [NotMapped]
        [JsonIgnore]
        public Roles Roles { get; set; }
    }
}
