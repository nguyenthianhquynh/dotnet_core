using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class OrderDto
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public int ShipmentId { get; set; }
        [Required]
        public int PaymentId { get; set; }

        [Required]
        public string BasketId { get; set; }
        public string Comment { get; set; }
    }
}