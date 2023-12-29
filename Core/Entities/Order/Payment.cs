using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class Payment: BaseEntity
    {
        public string ShortName { get; set; }
    }
}