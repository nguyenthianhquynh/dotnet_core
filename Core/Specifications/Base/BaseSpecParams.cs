using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class BaseSpecParams
    {
        public string Sort { get; set; }

        private string _search; 
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }

        //paging
        private const int MaxPageSize = 50;

        public int PageIndex { get; set; } = 1;
        private int _pageSize = 5;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}