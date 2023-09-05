using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace API.Helpers
{
    public class Pagination<T> where T : class
    {
        public double TotalPages { get; set; }
        public int TotalRecord { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public IReadOnlyList<T> Items { get; set; }
        public Pagination(int PageSize,int PageIndex,int TotalRecord, IReadOnlyList<T> Items) //Items have been filtered by specification 
        {
            this.TotalRecord = TotalRecord;
            this.TotalPages = Math.Ceiling(TotalRecord / (double)PageSize); //using in FE to calculate how many pages
            this.PageIndex = PageIndex;
            this.PageSize = PageSize;
            this.Items = Items;
        }
    }
}