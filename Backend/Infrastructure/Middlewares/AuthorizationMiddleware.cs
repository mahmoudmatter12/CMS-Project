// using System.Security.Claims;
// using CollageManagementSystem.Services;

// public class AuthorizationMiddleware
// {
//     private readonly RequestDelegate _next;

//     public AuthorizationMiddleware(RequestDelegate next)
//     {
//         _next = next;
//     }

//     public async Task Invoke(
//         HttpContext context,
//         IUserService userService)
//     {
//         // Skip authorization for certain paths
//         if (ShouldSkipAuthorization(context))
//         {
//             await _next(context);
//             return;
//         }

//         try
//         {
//             // 1. Get user ID from claims
//             var userId = GetUserIdFromClaims(context.User);

//             // 2. Get user role from database
//             var role = await userService.GetRoleByUserId(userId);

//             // 3. Check if authorized for this request
//             if (!IsAuthorized(context, role))
//             {
//                 context.Response.StatusCode = 403; // Forbidden
//                 await context.Response.WriteAsync("You don't have permission to access this resource");
//                 return;
//             }

//             // Store role in context for later use
//             context.Items["UserRole"] = role;

//             await _next(context);
//         }
//         catch (UnauthorizedAccessException ex)
//         {
//             context.Response.StatusCode = 401;
//             await context.Response.WriteAsync(ex.Message);
//         }
//         catch (Exception ex)
//         {
//             context.Response.StatusCode = 500;
//             await context.Response.WriteAsync($"Internal server error: {ex.Message}");
//         }
//     }

//     private bool ShouldSkipAuthorization(HttpContext context)
//     {
//         var referer = context.Request.Headers["Referer"].ToString();
//         var userAgent = context.Request.Headers["User-Agent"].ToString();

//         return context.Request.Path.StartsWithSegments("/api/auth") ||
//                context.Request.Path.StartsWithSegments("/swagger") ||
//                (!string.IsNullOrEmpty(referer) && referer.Contains("/swagger")) ||
//                (!string.IsNullOrEmpty(userAgent) && userAgent.Contains("Swagger", StringComparison.OrdinalIgnoreCase));
//     }

//     private Guid GetUserIdFromClaims(ClaimsPrincipal user)
//     {
//         var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
//         if (string.IsNullOrEmpty(userIdClaim))
//         {
//             throw new UnauthorizedAccessException("User ID not found in claims");
//         }

//         if (!Guid.TryParse(userIdClaim, out var userId))
//         {
//             throw new UnauthorizedAccessException("Invalid user ID format");
//         }

//         return userId;
//     }

//     private bool IsAuthorized(HttpContext context, string role)
//     {
//         var endpoint = context.GetEndpoint();
//         if (endpoint == null) return true;

//         // for all the routes /api/users/* can be accessed by all roles
//         if (context.Request.Path.StartsWithSegments("/api/users"))
//         {
//             return true;
//         }
//         // for all the routes /api/admin/* can be accessed by only by admin
//         if (context.Request.Path.StartsWithSegments("/api/admin"))
//         {
//             return role == "Admin";
//         }
//         // for all the routes /api/teacher/* can be accessed by only by teacher
//         if (context.Request.Path.StartsWithSegments("/api/teacher"))
//         {
//             return role == "Teacher" || role == "Admin";
//         }

//         // Default to true if no specific role restrictions are found
//         return true;
//     }
// }