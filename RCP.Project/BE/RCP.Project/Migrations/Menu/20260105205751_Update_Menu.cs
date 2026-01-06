using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Menu
{
    /// <inheritdoc />
    public partial class Update_Menu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ThucDonHang",
                schema: "menu");

            migrationBuilder.DropColumn(
                name: "AnhMinhHoa",
                schema: "menu",
                table: "ThucDon");

            migrationBuilder.DropColumn(
                name: "Gia",
                schema: "menu",
                table: "ThucDon");

            migrationBuilder.DropColumn(
                name: "Loai",
                schema: "menu",
                table: "ThucDon");

            migrationBuilder.RenameColumn(
                name: "TrangThai",
                schema: "menu",
                table: "ThucDon",
                newName: "TongSoMon");

            migrationBuilder.RenameColumn(
                name: "TenMon",
                schema: "menu",
                table: "ThucDon",
                newName: "TenThucDon");

            migrationBuilder.CreateTable(
                name: "Mon",
                schema: "menu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdHang = table.Column<int>(type: "int", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    AnhMinhHoa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Loai = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_Mon", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ThucDonMon",
                schema: "menu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdThucDon = table.Column<int>(type: "int", nullable: false),
                    IdMon = table.Column<int>(type: "int", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    Gia = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
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
                    table.PrimaryKey("PK_ThucDonMon", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mon",
                schema: "menu",
                table: "Mon",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ThucDonMon",
                schema: "menu",
                table: "ThucDonMon",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mon",
                schema: "menu");

            migrationBuilder.DropTable(
                name: "ThucDonMon",
                schema: "menu");

            migrationBuilder.RenameColumn(
                name: "TongSoMon",
                schema: "menu",
                table: "ThucDon",
                newName: "TrangThai");

            migrationBuilder.RenameColumn(
                name: "TenThucDon",
                schema: "menu",
                table: "ThucDon",
                newName: "TenMon");

            migrationBuilder.AddColumn<string>(
                name: "AnhMinhHoa",
                schema: "menu",
                table: "ThucDon",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Gia",
                schema: "menu",
                table: "ThucDon",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Loai",
                schema: "menu",
                table: "ThucDon",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ThucDonHang",
                schema: "menu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "getdate()"),
                    Deleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    DeletedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IdHang = table.Column<int>(type: "int", nullable: false),
                    IdThucDon = table.Column<int>(type: "int", nullable: false),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThucDonHang", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ThucDonHang",
                schema: "menu",
                table: "ThucDonHang",
                column: "Id");
        }
    }
}
