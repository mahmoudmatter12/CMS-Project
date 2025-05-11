using CollageManagementSystem.Core.Entities.department;
using CollageManagementSystem.Services;
using CollageMangmentSystem.Core.DTO.Responses;
using CollageMangmentSystem.Core.DTO.Responses.user;
using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Core.Entities.department;
using CollageMangmentSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace CollageMangmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class DepartmentController : ControllerBase
    {
        private readonly IRepository<Department> _DepartmentRepository;

        private readonly IUserService _tokenService;


        public DepartmentController(IRepository<Department> userRepository, IUserService tokenService)
        {
            _tokenService = tokenService;
            _DepartmentRepository = userRepository;
        }


        [HttpGet("all")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> GetAllDepartments(int pageNumber = 1, int pageSize = 10)
        {
            var departments = await _DepartmentRepository.GetAllAsyncPaged(pageNumber, pageSize);
            var totalDeps = await _DepartmentRepository.GetCountAsync();
            var departmentsDto = departments.Select(department => department.ToDepResponseDto()).ToList();
            foreach (var department in departmentsDto)
            {
                var hddName = department.HDDID.HasValue
                    ? await _tokenService.GetUserById(department.HDDID.Value)
                    : null;
                department.HDDName = hddName?.FullName;
            }
            return Ok(new PagedResponse<DepResponseDto>
            {
                Data = departmentsDto,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalDeps,
                TotalPages = (int)Math.Ceiling((double)totalDeps / pageSize)
            });
        }
        [HttpGet]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> GetAllDepartments()
        {
            var departments = await _DepartmentRepository.GetAllAsync();
            var departmentsDto = departments.Select(department => department.ToDepResponseDto()).ToList();
            foreach (var department in departmentsDto)
            {
                var hddName = department.HDDID.HasValue
                    ? await _tokenService.GetUserById(department.HDDID.Value)
                    : null;
                department.HDDName = hddName?.FullName;
            }
            return Ok(departmentsDto);
        }

        [HttpGet("{id:guid}")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> GetDepartmentById(Guid id)
        {
            var department = await _DepartmentRepository.GetByIdAsync(id);
            if (department == null)
            {
                return NotFound("Department not found");
            }
            var hddName = await _tokenService.GetUserById(department.HDDID ?? Guid.Empty);
            return Ok(new DepResponseDto
            {
                Id = department.Id,
                Name = department.Name,
                HDDID = department.HDDID,
                HDDName = hddName?.FullName,
            });
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateDepartment([FromBody] CreateDepRequestDto department)
        {
            if (department == null)
            {
                return BadRequest();
            }

            Department newDepartment = new Department
            {
                Name = department.Name,
                HDDID = department.HDDID,
            };

            var hdd = await _tokenService.GetUserById(department.HDDID);
            if (hdd == null)
            {
                return NotFound("HDD not found");
            }

            await _DepartmentRepository.AddAsync(
                newDepartment
            );
            return CreatedAtAction(nameof(GetDepartmentById), new { id = newDepartment.Id }, department);
        }

        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> UpdateDepartment(Guid id, [FromBody] UpdateDepRequestDto department)
        {
            var existingDepartment = await _DepartmentRepository.GetByIdAsync(id);
            if (existingDepartment == null)
            {
                return NotFound();
            }

            existingDepartment.Name = department.Name ?? existingDepartment.Name;
            existingDepartment.HDDID = department.HDDID ?? existingDepartment.HDDID;

            await _DepartmentRepository.UpdateAsync(
                existingDepartment
            );
            return Ok(new DepResponseDto
            {
                Id = existingDepartment.Id,
                Name = existingDepartment.Name,
                HDDID = existingDepartment.HDDID,
            });
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteDepartment(Guid id)
        {
            var department = await _DepartmentRepository.GetByIdAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            await _DepartmentRepository.DeleteAsync(department);
            return Ok("Department deleted successfully");
        }

        [HttpGet("{id:guid}/users")]
        [EnableRateLimiting("FixedWindowPolicy")]
        public async Task<IActionResult> GetUsersByDepartmentId(Guid id)
        {
            var department = await _DepartmentRepository.GetByIdAsync(id);
            if (department == null)
            {
                return NotFound("Department not found");
            }

            var users = await _tokenService.GetUsersByDepartmentId(id);
            if (users == null || !users.Any())
            {
                return NotFound("No users found in this department");
            }

            var userDtos = users.Select(user => user.ToGetStudentIdResponseDto()).ToList();
            var existingDepartment = new
            {
                Id = department.Id,
                Name = department.Name,
                HDDID = department.HDDID,
            };
            return Ok(new
            {
                Department = existingDepartment,
                Users = userDtos
            });
        }

    }

}