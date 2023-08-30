using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class UserRepository : IUserRepository
    {
        private readonly StoreContext _context;

        public UserRepository(StoreContext context){
            this._context = context;
        }
        public async Task<User> getUserByIdAsync(int id)
        {
           return await _context.Users.FindAsync(id);
        }

        public async Task<IReadOnlyList<User>> getUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

    }
}