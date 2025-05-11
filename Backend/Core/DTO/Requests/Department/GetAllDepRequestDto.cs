namespace CollageManagementSystem.Core.Entities.department
{
    public class GetAllDepRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string DepID { get; set; } = string.Empty;
        public string? HDDID { get; set; }
    }


}