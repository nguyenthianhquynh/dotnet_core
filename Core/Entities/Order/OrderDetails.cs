using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Order
{
    public class OrderDetails : BaseEntity
    {
        public int OrderId { get; set; }

        public Order Order { get; set; }
        public int ProductId { get; set; }

        public Product Product { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public OrderDetails()
        {

        }

        public OrderDetails(int orderId, int productId, int quantity, decimal price)
        {
            OrderId = orderId;
            ProductId = productId;
            Quantity = quantity;
            Price = price;
        }
    }
}