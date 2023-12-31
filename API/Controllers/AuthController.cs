using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;

        private readonly IMapper _mapper;
        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this._tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            //duplicate email
            if(this.getUserByEmailAsync(registerDto.Email).Result.Value != null) return BadRequest(new ApiResponse(400, "Email address already exists"));

            var user = new User
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("email")]
        public async Task<ActionResult<UserDto>> getUserByEmailAsync([FromQuery] string email)
        {
            var appUser = await _userManager.FindByEmailAsync(email);
            
            return (appUser == null) ? null : (new UserDto
            {
                Email = appUser.Email,
                DisplayName = appUser.DisplayName
            });
        }

        [HttpGet("address")]
        public async Task<ActionResult<List<AddressDto>>> GetUserAddress()
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddress(User);

            List<AddressDto> addresses = new List<AddressDto>();
            foreach (Address address in user.Addresses)
            {
                if (address != null)
                {
                    addresses.Add(_mapper.Map<Address, AddressDto>(address));
                }
            }
            return addresses;
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddress(User);

            user.Addresses = user.Addresses.Select(ad => {
                return (ad.Id == address.Id ? _mapper.Map<AddressDto, Address>(address) : ad);
            }).ToList();

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<AddressDto>(user.Addresses.Find(x => x.Id == address.Id)));

            return BadRequest("Problem updating the user");
        }

        //get list of Addresses by user id
        [HttpGet("address/{id}")]
        public async Task<ActionResult<AddressDto>> GetUserAddressById(int id)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddress(User);

            var address = user.Addresses.Find(x => x.Id == id);

            return _mapper.Map<Address, AddressDto>(address);
        }
    }
}