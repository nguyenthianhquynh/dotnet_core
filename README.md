INIT PROJECT
=============================

mkdir skinet
cd skinet
dotnet new sln
dotnet new webapi -o API
dotnet sln add API
dotnet new classlib -o Core
dotnet new classlib -o Infrastructure
dotnet sln add Core
dotnet sln add Infrastructure
cd API
dotnet add reference ../Infrastructure
cd ..
cd Infrastructure
dotnet add reference ../Core

Creating the required classes
=============================
--Core
----Entitites
------Product

--Infrastructure
----Data
------StoreContext.cs


REQUIREMENTS
=============================

Install Entity Framework Packages:(nuget)
  - Microsoft.EntityFrameworkCore.Design
  - Microsoft.EntityFrameworkCore.Sqlite

```
dotnet build
dotnet restore
```

Add a connection string in appsettings.development.json:

{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data source=skinet.db"
  }
}

Add the DbContext to the Program class (program class should look as follows):

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

Adding migration and updating database:
======================================

Make sure you have the dotnet ef tools installed with the version of the sdk you are using:

dotnet tool install --global dotnet-ef

Run the following commmand:

dotnet ef migrations add InitialCreate -p Infrastructure -s API -o Data/Migrations

dotnet ef database update -p Infrastructure -s API


Adding the controller
=====================


Add a controller with the following code:


using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return Ok(await _context.Products.FindAsync(id));
        }
    }
}


Add postman collection to postman.   Import skinet_postmancollection.json into your Postman and test the methods in Section 2 to make sure your controller can be reached. 

```
REFACTOR
```
classlib: Common/Library   
- dotnet new classlib -n Core
- dotnet new classlib -n Infrastructure

- dotnet sln add Core
- dotnet sln add Infrastructure

- dotnet add reference ../Core
- dotnet add reference ../Infrastructure

------ dotnet restore -> dotnet build

# 2. Create Interfaces Repository Pattern

- Core/Interfaces
- Infrastructure/Repositories

- dotnet new interface -n IProductRepository
- dotnet new class -n ProductRepository

- Controller -> Repository

------ addScoped<IProductRepository, ProductRepository> in Startup.cs
------ end run

# 3. Create BaseEntity for Id
- Core/Entities/BaseEntity.cs
- inherit BaseEntity in Users

```
REMOVE AND ADD AGAIN MIGRATIONS
```
1. delele xxx.db
2. dotnet ef migrations remove -p Infrastructure -s API
3. dotnet ef migrations add InitialCreate -p Infrastructure -s API -o Data/Migrations
4. dotnet ef database update -p Infrastructure -s API

Creating seed data
=============================
- Infrastructure/Data/SeedData.cs
- create StorecontextSeed
- add seed data in Program.cs

------ dotnet watch --no-hot-reload

Generic Repository/
Specification Pattern/
SpecificationEvaluator/
Shaping Data for the client/
AutoMapper/   (nuget: AutoMapper.Extensions.Microsoft.DependencyInjection)
Serving static content from API/ => UseStaticFiles()
=============================



Error Handling
=============================
