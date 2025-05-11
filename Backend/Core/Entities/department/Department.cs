using CollageManagementSystem.Core.Entities.department;

namespace CollageMangmentSystem.Core.Entities.department
{
    public class Department : BaseEntity
    {
        public int StudentCount { get; set; }
        public string Name { get; set; } = string.Empty;

        public Guid? HDDID { get; set; }
        public User? HDD { get; set; }

        public DepResponseDto ToDepResponseDto()
        {
            return new DepResponseDto
            {
                Id = this.Id,
                Name = this.Name,
                HDDID = this.HDDID,
            };
        }

    }
}