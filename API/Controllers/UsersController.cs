using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;

        public UsersController(IUserRepository repo)
        {
            this._repo = repo;
        }

        [HttpGet]
        public async Task<IReadOnlyList<User>>GetUsers()
        {
            return await _repo.getUsersAsync();
        }

        [HttpGet("{id}")] 
        public async Task<User>GetUserById(int id)
        {
            return await _repo.getUserByIdAsync(id);
        }
    }
}