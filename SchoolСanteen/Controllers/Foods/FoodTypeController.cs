using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolСanteen.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolСanteen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodTypeController : ControllerBase
    {
        private DbConnection _db;

        public FoodTypeController(DbConnection dbContext)
        {
            _db = dbContext;
        }

        [HttpGet]
        public IEnumerable<FoodType> GetFoodTypes()
        {
            return _db.FoodType.ToList();
        }

        [HttpPost]
        public IActionResult CreateFoodType(FoodType foodType)
        {
            _db.FoodType.Add(foodType);
            _db.SaveChanges();
            return Ok();

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFoodType(int foodTypeId)
        {
            var foodType = _db.FoodType.SingleOrDefault(f => f.Id == foodTypeId);
            _db.FoodType.Remove(foodType);
            _db.SaveChanges();
            return Ok();

        }

        [HttpPut]
        public IActionResult UpdateFoodType(FoodType updatedFoodType)
        {
            _db.FoodType.Update(updatedFoodType);
            _db.SaveChanges();
            return Ok();
        }
    }
}
