using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class UserUrlResolver : IValueResolver<User, UserReturnDto, string>
    {
        private readonly IConfiguration _configuration;
        public UserUrlResolver(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public string Resolve(User source, UserReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ProfilePic))
            {
                return _configuration["ApiUrl"] + source.ProfilePic;
            }
            return null;
        }
    }
}