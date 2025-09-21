using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Authentication
{
    /// <inheritdoc />
    public partial class Update_RolePermission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RolePermission",
                schema: "core",
                table: "RolePermission");
            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                schema: "core",
                table: "RolePermission",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
              name: "PK_RolePermission",
              schema: "core",
              table: "RolePermission",
              columns: new[] { "RoleId", "PermissionId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RolePermission",
                schema: "core",
                table: "RolePermission");
            migrationBuilder.AlterColumn<Guid>(
                name: "RoleId",
                schema: "core",
                table: "RolePermission",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
            migrationBuilder.AddPrimaryKey(
               name: "PK_RolePermission",
               schema: "core",
               table: "RolePermission",
               columns: new[] { "RoleId", "PermissionId" });
        }
    }
}
