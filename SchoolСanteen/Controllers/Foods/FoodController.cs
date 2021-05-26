using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolСanteen.Controllers.Foods;
using SchoolСanteen.Models;
using System;
using System.Collections.Generic;
using System.IO;
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

        [HttpGet]
        [Route("getAll")]
        public IEnumerable<Food> GetAllFoods() => _db.Food.ToList();
        

        [HttpPost]
        public async Task<IActionResult> CreateFoodAsync(Food foodsRequest)
        {
            _db.Food.Add(foodsRequest);
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

        private async Task<string> saveFile(IFormFile file)
        {
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }
            var content = Convert.ToBase64String(fileBytes);

            return content;
        }
    }
}
