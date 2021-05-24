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

        public int[] FoodsId { get; set; }

        public DateTime Date { get; set; }

        public double TotalPrice { get; set; }

    }
}
