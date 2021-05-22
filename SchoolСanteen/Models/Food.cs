using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolСanteen.Models
{
    public class Food
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public int Price { get; set; }

        public int FoodTypeId { get; set; }

        public FoodType FoodType { get; set; }

    }
}
