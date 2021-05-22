using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolСanteen.Models
{
    public class FoodType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Food Food { get; set; }

    }
}
