namespace CollageManagementSystem.Core.Entities.department
{
    public class DepResponseDto
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public Guid? HDDID { get; set; }
        public string? HDDName { get; set; }
    }
}