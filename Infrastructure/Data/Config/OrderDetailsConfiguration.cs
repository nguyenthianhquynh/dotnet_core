using Core.Entities;
using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Data.Config
{
    public class OrderDetailsConfiguration : IEntityTypeConfiguration<OrderDetails>
    {
        public void Configure(EntityTypeBuilder<OrderDetails> builder)
        {
            builder.Property(u => u.Id).IsRequired();
            builder.Property(u => u.OrderId).IsRequired();
            builder.Property(u => u.ProductId).IsRequired();
            builder.Property(u => u.Quantity).IsRequired();
            builder.Property(u => u.Price).IsRequired();

            builder.HasOne(u => u.Order)
                .WithMany()
                .HasForeignKey(ur => ur.OrderId)
                .IsRequired();

            builder.HasOne(u => u.Product)
                .WithMany()
                .HasForeignKey(ur => ur.ProductId)
                .IsRequired();
        }
        
    }
}