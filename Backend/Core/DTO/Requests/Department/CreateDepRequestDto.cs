namespace CollageManagementSystem.Core.Entities.department
{
    public class CreateDepRequestDto
    {
        public required string Name { get; set; }
        public required Guid HDDID { get; set; }

    }
}