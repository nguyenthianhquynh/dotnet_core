using Core.Entities;
using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Data.Config
{
    public class ShipmentConfiguration : IEntityTypeConfiguration<Shipment>
    {
        public void Configure(EntityTypeBuilder<Shipment> builder)
        {
            builder.Property(u => u.Id).IsRequired();
            builder.Property(u => u.ShortName).IsRequired();
            builder.Property(u => u.DeliveryTime).IsRequired();
            builder.Property(u => u.Price).IsRequired();
        }

    }
}