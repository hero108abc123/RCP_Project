using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Cinema
{
    /// <inheritdoc />
    public partial class Update_Ghe_GiaVe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdCinema",
                schema: "cinema",
                table: "GiaVe");

            migrationBuilder.DropColumn(
                name: "IdGhe",
                schema: "cinema",
                table: "GiaVe");

            migrationBuilder.RenameColumn(
                name: "IdRoom",
                schema: "cinema",
                table: "GiaVe",
                newName: "TrangThaiNgay");

            migrationBuilder.RenameColumn(
                name: "IdPhim",
                schema: "cinema",
                table: "GiaVe",
                newName: "HangGhe");

            migrationBuilder.RenameColumn(
                name: "Gia",
                schema: "cinema",
                table: "GiaVe",
                newName: "GiaNgayThuong");

            migrationBuilder.AddColumn<string>(
                name: "GiaNgayLe",
                schema: "cinema",
                table: "GiaVe",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "GheGiaVe",
                schema: "cinema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdGhe = table.Column<int>(type: "int", nullable: false),
                    IdGiaVe = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "getdate()"),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    DeletedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GheGiaVe", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GheGiaVe",
                schema: "cinema",
                table: "GheGiaVe",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GheGiaVe",
                schema: "cinema");

            migrationBuilder.DropColumn(
                name: "GiaNgayLe",
                schema: "cinema",
                table: "GiaVe");

            migrationBuilder.RenameColumn(
                name: "TrangThaiNgay",
                schema: "cinema",
                table: "GiaVe",
                newName: "IdRoom");

            migrationBuilder.RenameColumn(
                name: "HangGhe",
                schema: "cinema",
                table: "GiaVe",
                newName: "IdPhim");

            migrationBuilder.RenameColumn(
                name: "GiaNgayThuong",
                schema: "cinema",
                table: "GiaVe",
                newName: "Gia");

            migrationBuilder.AddColumn<int>(
                name: "IdCinema",
                schema: "cinema",
                table: "GiaVe",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdGhe",
                schema: "cinema",
                table: "GiaVe",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
