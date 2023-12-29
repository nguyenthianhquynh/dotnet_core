using Core.Entities;
using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(u => u.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Property(u => u.UserId).IsRequired();
            builder.Property(u => u.ShipmentId).IsRequired();
            builder.Property(u => u.PaymentId).IsRequired();

            builder.Property(u => u.Status)
                .IsRequired()
                .HasDefaultValue(0);

            builder.Property(u => u.CreateAt).HasDefaultValueSql("datetime('now')");
            builder.Property(u => u.UpdateAt).HasDefaultValueSql("datetime('now')");
            //RequiredDate = DateTime.Now.AddDays(3),
            builder.Property(u => u.RequiredDate).HasDefaultValueSql("datetime('now','+3 days')");


            builder.HasOne(u => u.Shipment)
                .WithMany()
                .HasForeignKey(ur => ur.ShipmentId)
                .IsRequired();

            builder.HasOne(u => u.Payment)
                .WithMany()
                .HasForeignKey(ur => ur.PaymentId)
                .IsRequired();
        }

    }
}