using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolСanteen.Models
{
    public class Orders
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int FoodId { get; set; }

        public DateTime Date { get; set; }

        public double Price { get; set; }

        public int Count { get; set; }

    }
}
