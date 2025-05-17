using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CollageMangmentSystem.Migrations
{
    /// <inheritdoc />
    public partial class userEnrollmentsDetailsV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Courses",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "InstructorId",
                table: "Courses",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_InstructorId",
                table: "Courses",
                column: "InstructorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Users_InstructorId",
                table: "Courses",
                column: "InstructorId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Users_InstructorId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_InstructorId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "InstructorId",
                table: "Courses");
        }
    }
}
