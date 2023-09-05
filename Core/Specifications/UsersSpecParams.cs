using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class UsersSpecParams : BaseSpecParams
    {
        //filtering
        public string Role { get; set; }
    }
}