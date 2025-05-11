// Core/Interfaces/IPasswordHasher.cs
namespace CollageMangmentSystem.Core.Interfaces
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
        bool VerifyPassword(string hashedPassword, string providedPassword);
    }
}

// Infrastructure/Services/PasswordHasher.cs
