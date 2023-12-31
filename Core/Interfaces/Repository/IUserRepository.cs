using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> getUserByIdAsync(int id);
        public Task<IReadOnlyList<User>> getUsersAsync();
    }
}