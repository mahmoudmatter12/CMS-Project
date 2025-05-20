namespace CollageMangmentSystem.Core.DTO.Responses.user
{
    public class PagedResponse<T>
    {
        public IEnumerable<T>? Data { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
    }
}
