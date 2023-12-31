using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class AppUser: BaseEntity
    {
       public int RoleId {get; set;}
       public string UserName {get; set;}

       public string Email { get; set; }

        public string PasswordHash {get; set;}
       public string FirstName {get; set;}
       public string LastName {get; set;}
       public string ProfilePic {get; set;}
       public Role Role {get; set;}
       public DateTime LastLogin {get; set;}
       public DateTime CreateAt {get; set;}
       public DateTime UpdateAt {get; set;}
    }
}