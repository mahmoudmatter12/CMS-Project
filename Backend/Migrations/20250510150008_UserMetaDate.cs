using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CollageMangmentSystem.Migrations
{
    /// <inheritdoc />
    public partial class UserMetaDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "CGPA",
                table: "Users",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Level",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CGPA",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Level",
                table: "Users");
        }
    }
}
