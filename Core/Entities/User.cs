using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class User
    {
       public int Id {get; set;}
       public string UserName {get; set;}
       public string Password {get; set;}
       public string FirstName {get; set;}
       public string LastName {get; set;}
       public string ProfilePic {get; set;}
       public string Email {get; set;}
       public DateTime CreateAt {get; set;}
       public DateTime UpdateAt {get; set;}
    }
}