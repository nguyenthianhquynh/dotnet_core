using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<Pagination<UserReturnDto>>GetUsers([FromQuery]UsersSpecParams usersParams)
        {
            // return await UsersRepo.getItemsAsync();
            var spec = new UsersWithPermission(usersParams);
            var users = await UsersRepo.getItemsAsyncBySpec(spec);

            var specCount = new UsersWithPermission(usersParams,true);
            var TotalRecord = await UsersRepo.CountAsync(specCount);

            var rsCombinePaginated = new Pagination<UserReturnDto>(
                usersParams.PageSize,
                usersParams.PageIndex,
                TotalRecord,
                _mapper.Map<IReadOnlyList<UserReturnDto>>(users));


            return rsCombinePaginated;
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