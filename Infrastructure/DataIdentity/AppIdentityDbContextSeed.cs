using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.DataIdentity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<User> userManager)
        {
            
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    DisplayName = "Bob1",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Addresses = new List<Address>
                    {
                        new Address
                        {
                            FirstName = "Bob",
                            LastName = "Bobbity",
                            Street = "10 The Street",
                            City = "New York",
                            State = "NY",
                            Zipcode = "90210"
                        }
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}