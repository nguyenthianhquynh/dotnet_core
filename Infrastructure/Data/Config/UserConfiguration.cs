using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Data.Config
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.Id).IsRequired();
            builder.Property(u => u.UserName).IsRequired();
            builder.Property(u => u.Email).IsRequired();
            builder.Property(u => u.PasswordHash).IsRequired();

            //builder.HasMany(u => u.UserRoles).WithOne().HasForeignKey(ur => ur.UserId).IsRequired();

            builder.Property(u => u.CreateAt).HasDefaultValueSql("datetime('now')");
            builder.Property(u => u.UpdateAt).HasDefaultValueSql("datetime('now')");
        }

    }
}