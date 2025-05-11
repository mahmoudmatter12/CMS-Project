using CollageManagementSystem.Models;
using CollageMangmentSystem.Core.Entities;
using System.Security.Claims;

namespace CollageManagementSystem.Services.Auth
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user , string role );
        string GenerateRefreshToken();
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);

        public ClaimsPrincipal ValidateToken(string token);
    }
}