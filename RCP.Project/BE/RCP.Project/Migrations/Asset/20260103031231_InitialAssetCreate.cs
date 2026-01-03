using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Asset
{
    /// <inheritdoc />
    public partial class InitialAssetCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "asset");

            migrationBuilder.CreateTable(
                name: "TaiSan",
                schema: "asset",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaTaiSan = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TenTaiSan = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    LoaiTaiSan = table.Column<int>(type: "int", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    NguyenGia = table.Column<decimal>(type: "decimal(18,2)", maxLength: 100, nullable: false),
                    NgayBatDauSuDung = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiGianKhauHaoThang = table.Column<int>(type: "int", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    RapChieuId = table.Column<int>(type: "int", nullable: false),
                    PhongChieuId = table.Column<int>(type: "int", nullable: true),
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
                    table.PrimaryKey("PK_TaiSan", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaiSan",
                schema: "asset",
                table: "TaiSan",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaiSan",
                schema: "asset");
        }
    }
}
