using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Identity;

namespace Core.Specifications
{
    public class UsersWithPermission : BaseSpecification<User>
    {
        public UsersWithPermission(UsersSpecParams usersParams) : base(u =>
            (string.IsNullOrEmpty(usersParams.Role) || u.Role.Name.ToLower() == usersParams.Role) //filtering condition
                                                                                                  // && TODO: add more filtering condition
            && (string.IsNullOrEmpty(usersParams.Search) || u.Role.Name.ToLower().Contains(usersParams.Search)) //searching condition
                                                                                                                //DEV: How to search in multiple fields?
            )
        {
            AddInclude(x => x.Role);
            AddInclude(x => x.Role.RolePermission);
            AddGroupBy(x => x.Id);
            AddOrderBy(x => x.UserName); //init default

            if (!string.IsNullOrEmpty(usersParams.Sort))
            {
                switch (usersParams.Sort)
                {
                    case "usernameDesc":
                        AddOrderByDescending(x => x.UserName);
                        break;
                    //TODO: add more cases
                    default:
                        AddOrderBy(x => x.UserName);// return default
                        break;
                }

            }

            ApplyPaging(usersParams.PageSize * (usersParams.PageIndex - 1), usersParams.PageSize);
        }
        // public UsersWithPermission(int id) : base(x => x.Id == id)
        // {
        //     AddInclude(x => x.Role);
        //     AddInclude(x => x.Role.RolePermission);
        // }

        public UsersWithPermission(UsersSpecParams usersParams, bool isFilter) : base(u =>
        (string.IsNullOrEmpty(usersParams.Role) || u.Role.Name.ToLower() == usersParams.Role) //filtering condition
                                                                                            // && TODO: add more filtering condition
        && (string.IsNullOrEmpty(usersParams.Search) || u.Role.Name.ToLower().Contains(usersParams.Search)) //searching condition
                                                                                                            //DEV: How to search in multiple fields?
        )
            { }
        }
}