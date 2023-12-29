using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Order;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(Order order, string BasketId);

        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string userId);
    }
}