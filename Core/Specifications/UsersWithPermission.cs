using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class UsersWithPermission : BaseSpecification<User>
    {
        public UsersWithPermission()
        {
            AddInclude(x => x.Role);
            AddInclude(x => x.Role.RolePermission);
            AddGroupBy(x => x.Id);
        }
        public UsersWithPermission(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Role);
            AddInclude(x => x.Role.RolePermission);
        }
    }
}