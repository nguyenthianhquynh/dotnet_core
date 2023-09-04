using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using Core.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class MapConfiguration : Profile
    {
        public MapConfiguration()
        {
            CreateMap<User, UserReturnDto>()
                .ForMember(d => d.Role, o => o.MapFrom(s => s.Role.Name));
        }
    }
}