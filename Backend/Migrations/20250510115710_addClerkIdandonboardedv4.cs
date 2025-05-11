using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CollageMangmentSystem.Migrations
{
    /// <inheritdoc />
    public partial class addClerkIdandonboardedv4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StudentCollageId",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentCollageId",
                table: "Users");
        }
    }
}
