using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrderAsync(OrderDto orderDto)
        {
            var order = new Order(orderDto.UserId, orderDto.ShipmentId, orderDto.PaymentId, orderDto.Comment);

            order = await _orderService.CreateOrderAsync(order, orderDto.BasketId);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));
            
            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Order>>> GetOrdersForUserAsync()
        {
            //var email = User.RetrieveEmailFromPrincipal();
            string userId = User.RetrieveNameIdentifierFromPrincipal();

            var orders = await _orderService.GetOrdersForUserAsync(userId);

            return Ok(orders);
        }

        [HttpGet("shipments")]
        public async Task<ActionResult<IReadOnlyList<Shipment>>> GetShipmentsAsync()
        {
            //var email = User.RetrieveEmailFromPrincipal();
            //string userId = User.RetrieveNameIdentifierFromPrincipal();

            var shipments = await _orderService.GetShipmentAsync();

            return Ok(shipments);
        }
    }
}