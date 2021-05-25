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
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DbConnection _db;
        private readonly IConfiguration _config;

        public OrdersController(DbConnection dbContext, IConfiguration config)
        {
            _db = dbContext;
            _config = config;
        }

        [HttpPost]
        public IActionResult SaveOrder(List<Orders> ordersRequest)
        {
            var orders = new List<Orders>();
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var login = JWTHelper.GetUserLogin(token, _config["AuthOptions:SignInKey"]);
            var currentUser = _db.Users.SingleOrDefault(u => u.Username == login);

            foreach (var order in ordersRequest)
            {
                Orders newOrder = new Orders();
                newOrder.Date = DateTime.Now;
                newOrder.FoodId = order.FoodId;
                newOrder.Price = order.Price;
                newOrder.Count = order.Count;
                newOrder.UserId = currentUser.Id;
                
                orders.Add(newOrder);
            }

            _db.Orders.AddRange(orders);
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet("MyOrders")]
        public IActionResult GetMyOrders()
        {
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var login = JWTHelper.GetUserLogin(token, _config["AuthOptions:SignInKey"]);
            var currentUser = _db.Users.SingleOrDefault(u => u.Username == login);

            var myOrders = _db.Orders.Where(o => o.UserId == currentUser.Id);
            return Ok(myOrders);
        }

    }
}
