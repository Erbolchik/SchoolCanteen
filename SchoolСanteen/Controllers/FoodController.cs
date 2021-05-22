using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolСanteen.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolСanteen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private DbConnection _db;

        public FoodController(DbConnection dbContext)
        {
            _db = dbContext;
        }

        [HttpGet]
        public IEnumerable<Food> GetFoods()
        {
            return _db.Food.Include(c => c.FoodType).ToList();
        }

        [HttpPost]
        public IActionResult CreateCar(Food food)
        {
            _db.Food.Add(food);
            _db.SaveChanges();
            return Ok();

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFood(int foodId)
        {
            var food = _db.Food.SingleOrDefault(f => f.Id == foodId);
            _db.Food.Remove(food);
            _db.SaveChanges();
            return Ok();

        }

        [HttpPut]
        public IActionResult UpdateFood(Food updatedFood)
        {
            _db.Food.Update(updatedFood);
            _db.SaveChanges();
            return Ok();
        }
    }
}
