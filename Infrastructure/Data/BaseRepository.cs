using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _context;

        public BaseRepository()
        {
        }

        public BaseRepository(StoreContext context)
        {
            this._context = context;

        }

        public async Task<int> CountAsync(IBaseSpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        public async Task<T> getItemByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> getItemsAsync(IBaseSpecification<T>  spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }

        private IQueryable<T> ApplySpecification(IBaseSpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }
    }
}