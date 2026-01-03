using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Phim
{
    /// <inheritdoc />
    public partial class Update_TheLoai : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                schema: "Movie",
                table: "TheLoai",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                schema: "Movie",
                table: "TheLoai",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                schema: "Movie",
                table: "TheLoai",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                schema: "Movie",
                table: "TheLoai",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedDate",
                schema: "Movie",
                table: "TheLoai",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                schema: "Movie",
                table: "TheLoai",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                schema: "Movie",
                table: "TheLoai",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                schema: "Movie",
                table: "TheLoai");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                schema: "Movie",
                table: "TheLoai");

            migrationBuilder.DropColumn(
                name: "Deleted",
                schema: "Movie",
                table: "TheLoai");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                schema: "Movie",
                table: "TheLoai");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                schema: "Movie",
                table: "TheLoai");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                schema: "Movie",
                table: "TheLoai");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                schema: "Movie",
                table: "TheLoai");
        }
    }
}
