using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolСanteen.Models
{
    public class DbConnection : DbContext
    {
        public DbConnection(DbContextOptions<DbConnection> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Food>()
                .HasOne(f => f.FoodType)
                .WithOne(ft => ft.Food)
                .HasForeignKey<Food>(f => f.FoodTypeId);

            modelBuilder.Entity<Users>()
                .HasOne(u => u.Roles)
                .WithOne(r => r.Users)
                .HasForeignKey<Users>(k => k.RoleId);
        }

        public DbSet<Food> Food { get; set; }

        public DbSet<FoodType> FoodType { get; set; }

        public DbSet<Users> Users { get; set; }

        public DbSet<Roles> Roles { get; set; }

    }
}
