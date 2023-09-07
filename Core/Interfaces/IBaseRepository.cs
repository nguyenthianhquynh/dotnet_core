
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IBaseRepository<T> where T : BaseEntity
    {
        public Task<T> getItemByIdAsync(int id);
        public Task<IReadOnlyList<T>> getItemsAsync(IBaseSpecification<T> spec);

        public Task<int> CountAsync(IBaseSpecification<T> spec);
    }
}