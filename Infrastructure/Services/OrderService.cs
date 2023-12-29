using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Interfaces.Repository;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBasketRepository _basketRepo;
        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepo)
        {
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
        }

        public async Task<Order> CreateOrderAsync(Order order,string basketId)
        {
            var basket = await _basketRepo.GetBasketAsync(basketId);

            if (basket == null) return null;

            int OrderId =  await _unitOfWork.Repository<Order>().AddAsync(order);

            foreach (var item in basket?.Items)
            {
                var itemOrder = new OrderDetails
                {
                    OrderId = OrderId,
                    ProductId = item.Id,
                    Quantity = item.Quantity,
                    Price = item.Price
                };
                _unitOfWork.Repository<OrderDetails>().Add(itemOrder);
            }

            //save
            var result = await _unitOfWork.Complete();
            if (result <= 0) return null;

            //delete basket or product inside basket
            await _basketRepo.DeleteBasketAsync(basket.Id);

            return order;
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string userId)
        {
            var spec = new OrderSpecification(userId);
            var orders = _unitOfWork.Repository<Order>().getItemsAsyncBySpec(spec);
            return orders;
        }
    }
}