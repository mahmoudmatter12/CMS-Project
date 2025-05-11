using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CollageMangmentSystem.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Users_HDDId",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "HDDID",
                table: "Departments");

            migrationBuilder.RenameColumn(
                name: "HDDId",
                table: "Departments",
                newName: "HDDID");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_HDDId",
                table: "Departments",
                newName: "IX_Departments_HDDID");

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Users_HDDID",
                table: "Departments",
                column: "HDDID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Users_HDDID",
                table: "Departments");

            migrationBuilder.RenameColumn(
                name: "HDDID",
                table: "Departments",
                newName: "HDDId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_HDDID",
                table: "Departments",
                newName: "IX_Departments_HDDId");

            migrationBuilder.AddColumn<Guid>(
                name: "HDDID",
                table: "Departments",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Users_HDDId",
                table: "Departments",
                column: "HDDId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
