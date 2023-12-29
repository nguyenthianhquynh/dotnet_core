using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }

        public Role Role { get; set; }
        public List<Address> Addresses { get; set; }
    }
}