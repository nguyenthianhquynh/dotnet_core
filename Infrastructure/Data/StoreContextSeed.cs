using System.Reflection;
using System.Security.Principal;
using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (!context.Roles.Any())
            {
                //Infrastructure/Data/SeedData/Roles.json
                var rolesData = File.ReadAllText("../Infrastructure/Data/SeedData/Roles.json");
                var roles = JsonSerializer.Deserialize<List<Role>>(rolesData);
                context.Roles.AddRange(roles);
            }

            if (!context.Permissions.Any())
            {
                var permissionsData = File.ReadAllText("../Infrastructure/Data/SeedData/Permissions.json");
                var permissions = JsonSerializer.Deserialize<List<Permission>>(permissionsData);
                context.Permissions.AddRange(permissions);
            }

            if (!context.RolePermissions.Any())
            {
                var rolePermissionsData = File.ReadAllText("../Infrastructure/Data/SeedData/RolePermissions.json");
                var rolePermissions = JsonSerializer.Deserialize<List<RolePermission>>(rolePermissionsData);
                context.RolePermissions.AddRange(rolePermissions);
            }

            if (!context.Users.Any())
            {
                var usersData = File.ReadAllText("../Infrastructure/Data/SeedData/Users.json");
                var users = JsonSerializer.Deserialize<List<User>>(usersData);
                context.Users.AddRange(users);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}