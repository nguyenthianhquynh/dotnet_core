using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities.Order
{
    public class Order: BaseEntity
    {
        public Order()
        {
            
        }

        public Order(string userId, int shipmentId, int paymentId,string comment)
        {
            UserId = userId;
            ShipmentId = shipmentId;
            PaymentId = paymentId;
            Comment = comment;
            DeliveryDate = null;
        }
        
        public string UserId { get; set; }
        public int ShipmentId { get; set; }

        public Shipment Shipment { get; set; }
        public int PaymentId { get; set; }

        public Payment Payment { get; set; }
        public Nullable<DateTime> RequiredDate { get; set; }//if over 3 days, we will send email to customer. auto cancel order/ notify customer to cancel order/or wait more times
        public Nullable<DateTime> DeliveryDate { get; set; }
        public int Status { get; set; }
        public string Comment { get; set; }

        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}