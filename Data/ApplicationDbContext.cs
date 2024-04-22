// this is database context
// inherit from DbContext and include DbSet for Image
// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using loginPOC.Models; //use the correct nampespace where your image class is 

namespace LoginPOC.Data
{
    public class ApplicationDbContext : DbContext
    {
        //Add a constructor that takes DbContextOptions and calls the base constructor
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            
            optionsBuilder.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
        }

        // Dbset properties
        public DbSet<Image> Images { get; set; } // This now correctly refers to the Image class from the Models namespace
    }
}