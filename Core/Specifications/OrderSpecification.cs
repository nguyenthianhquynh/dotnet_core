using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Order;

namespace Core.Specifications
{
    public class OrderSpecification : BaseSpecification<Order>
    {
        public OrderSpecification(string userId) : base(o => o.UserId == userId)
        {
            AddOrderByDescending(o => o.CreateAt);
        }

    }
}