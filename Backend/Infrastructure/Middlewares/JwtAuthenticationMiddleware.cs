// using CollageManagementSystem.Services.Auth;
// using Microsoft.IdentityModel.Tokens;
// using System.Security.Claims;

// namespace CollageManagementSystem.Middleware
// {
//     public class JwtAuthenticationMiddleware
//     {
//         private readonly RequestDelegate _next;
//         private readonly ITokenService? _tokenService;
//         private readonly IWebHostEnvironment _env;


//         public JwtAuthenticationMiddleware(RequestDelegate next, IConfiguration configuration, ITokenService tokenService, IWebHostEnvironment env)
//         {
//             _next = next;
//             _tokenService = tokenService;
//             _env = env;
//         }


//         public async Task Invoke(HttpContext context)
//         {
//             // Skip authentication for auth endpoints and swagger
//             var referer = context.Request.Headers["Referer"].ToString();
//             var userAgent = context.Request.Headers["User-Agent"].ToString();

//             if (context.Request.Path.StartsWithSegments("/api/auth") ||
//                 context.Request.Path.StartsWithSegments("/swagger") ||
//                 (!string.IsNullOrEmpty(referer) && referer.Contains("/swagger")) ||
//                 (!string.IsNullOrEmpty(userAgent) && userAgent.Contains("Swagger", StringComparison.OrdinalIgnoreCase)))
//             {
//                 await _next(context);
//                 return;
//             }


//             // Try to get token from cookie first
//             var token = context.Request.Cookies["accessToken"];

//             // Fallback to Authorization header
//             if (string.IsNullOrEmpty(token))
//             {
//                 var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
//                 if (authHeader?.StartsWith("Bearer ") == true)
//                 {
//                     token = authHeader.Substring("Bearer ".Length).Trim();
//                 }
//             }

//             if (string.IsNullOrEmpty(token))
//             {
//                 context.Response.StatusCode = 401;
//                 // Console.WriteLine("Skipping authentication for auth endpoints and swagger.");
//                 Console.WriteLine(context.Request.Path);

//                 await context.Response.WriteAsync("No token provided login first");
//                 return;
//             }

//             try
//             {
//                 if (_tokenService == null)
//                 {
//                     context.Response.StatusCode = 500;
//                     await context.Response.WriteAsync("Token service is not available");
//                     return;
//                 }

//                 var principal = _tokenService.ValidateToken(token);
//                 context.User = principal;

//                 // Attach user info to context
//                 var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
//                 if (!string.IsNullOrEmpty(userId))
//                 {
//                     context.Items["UserId"] = userId;
//                 }

//                 await _next(context);
//             }
//             catch (SecurityTokenExpiredException)
//             {
//                 context.Response.StatusCode = 401;
//                 await context.Response.WriteAsync("Token has expired");
//             }
//             catch (Exception)
//             {
//                 context.Response.StatusCode = 401;
//                 await context.Response.WriteAsync("Invalid token");
//             }
//         }

//     }
// }