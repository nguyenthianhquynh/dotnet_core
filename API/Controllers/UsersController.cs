using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IBaseRepository<User> UsersRepo;
        private readonly IBaseRepository<RolePermission> RolePerRepo;
        private readonly IMapper _mapper;

        public UsersController(IBaseRepository<User> usersRepo,
        IBaseRepository<RolePermission> rolePerRepo,
        IMapper mapper)
        {
            this._mapper = mapper;
            this.RolePerRepo = rolePerRepo;
            this.UsersRepo = usersRepo;
        }

        [HttpGet]
        public async Task<IReadOnlyList<UserReturnDto>>GetUsers()
        {
            // return await UsersRepo.getItemsAsync();
            var spec = new UsersWithPermission();
            var users = await UsersRepo.getItemsAsync(spec);
            return _mapper.Map<IReadOnlyList<UserReturnDto>>(users);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)] // this is for swagger
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)] // this is for swagger
        public async Task<ActionResult<UserReturnDto>> GetUserById(int id)
        {
            var user = await UsersRepo.getItemByIdAsync(id);

            if (user == null){
                user.Id = id;
                return NotFound(new ApiResponse(404));
            } 

            return _mapper.Map<User,UserReturnDto>(user);
        }
    }
}