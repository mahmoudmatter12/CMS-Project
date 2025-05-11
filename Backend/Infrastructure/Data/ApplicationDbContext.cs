using Microsoft.AspNetCore.Http;  // For IHttpContextAccessor
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;     // For accessing user claims
using CollageMangmentSystem.Core.Entities;
using CollageMangmentSystem.Core.Entities.course;
using CollageMangmentSystem.Core.Entities.department;
using System.Linq.Expressions;
using CollageManagementSystem.Core.Entities.userEnrollments;
using Core.Entities.Quizzes;

namespace CollageMangmentSystem.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        // Inject IHttpContextAccessor to get current user
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Course> Courses { get; set; }

        public DbSet<UserEnrollments> UserEnrollments { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<QuizQuestion> QuizQuestions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Department-HDD relationship
            modelBuilder.Entity<Department>()
            .HasOne(d => d.HDD)
            .WithMany()
            .HasForeignKey(d => d.HDDID)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false);

            // Configure User-Department relationship
            modelBuilder.Entity<User>()
            .HasOne(u => u.Department)
            .WithMany()
            .HasForeignKey(u => u.DepartmentId)
            .IsRequired(false);

            // Unique email
            modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

            // Quiz–QuizQuestion relationship
            modelBuilder.Entity<QuizQuestion>()
            .HasOne(q => q.Quiz)
            .WithMany(qz => qz.Questions)
            .HasForeignKey(q => q.QuizId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired(false);

            // Soft delete global filter
            foreach (var entityType in modelBuilder.Model.GetEntityTypes()
            .Where(e => typeof(BaseEntity).IsAssignableFrom(e.ClrType)))
            {
                if (modelBuilder.Entity(entityType.ClrType).Metadata.GetQueryFilter() == null)
                {
                    var parameter = Expression.Parameter(entityType.ClrType, "e");
                    var property = Expression.Property(parameter, "IsDeleted");
                    var falseConstant = Expression.Constant(false);
                    var equalExpression = Expression.Equal(property, falseConstant);
                    var lambda = Expression.Lambda(equalExpression, parameter);

                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                }
            }
        }


        public override int SaveChanges()
        {
            SetAuditProperties();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            SetAuditProperties();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void SetAuditProperties()
        {
            var currentUser = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "System";
            var currentTime = DateTime.UtcNow;


            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                switch (entry)
                {
                    case { State: EntityState.Added }:
                        entry.Entity.CreatedAt = currentTime;
                        entry.Entity.CreatedBy = currentUser;
                        entry.Entity.UpdatedAt = currentTime;
                        entry.Entity.UpdatedBy = currentUser;
                        break;

                    case { State: EntityState.Modified }:
                        entry.Entity.UpdatedAt = currentTime;
                        entry.Entity.UpdatedBy = currentUser;
                        break;

                    case { State: EntityState.Deleted } when entry.Entity is ISoftDelete softDeleteEntity:
                        entry.State = EntityState.Modified;
                        softDeleteEntity.IsDeleted = true;
                        softDeleteEntity.DeletedAt = currentTime;
                        softDeleteEntity.DeletedBy = currentUser;
                        break;
                    case { State: EntityState.Deleted }:
                        entry.State = EntityState.Modified;
                        entry.Entity.IsDeleted = true;
                        entry.Entity.DeletedAt = currentTime;
                        entry.Entity.DeletedBy = currentUser;
                        break;
                    default:
                        // Do nothing
                        break;
                }
            }
        }
    }

    // Optional interface for explicit soft delete implementation
    public interface ISoftDelete
    {
        bool IsDeleted { get; set; }
        DateTime? DeletedAt { get; set; }
        string? DeletedBy { get; set; }
    }
}