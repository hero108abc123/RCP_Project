using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Phim
{
    /// <inheritdoc />
    public partial class addphimmodule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Movie");

            migrationBuilder.CreateTable(
                name: "Phim",
                schema: "Movie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenPhim = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    DaoDien = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DienVien = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ThoiLuongPhut = table.Column<int>(type: "int", nullable: false),
                    NgayKhoiChieu = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgonNgu = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    PhanLoaiDoTuoi = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    DangChieu = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<int>(type: "int", nullable: true),
                    DeleteBy = table.Column<int>(type: "int", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phim", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TheLoai",
                schema: "Movie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenTheLoai = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheLoai", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhimAnh",
                schema: "Movie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhimId = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    LoaiAnh = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LaAnhChinh = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhimAnh", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhimAnh_Phim_PhimId",
                        column: x => x.PhimId,
                        principalSchema: "Movie",
                        principalTable: "Phim",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhimVideo",
                schema: "Movie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhimId = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    TieuDe = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    LoaiVideo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhimVideo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhimVideo_Phim_PhimId",
                        column: x => x.PhimId,
                        principalSchema: "Movie",
                        principalTable: "Phim",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhimTheLoai",
                schema: "Movie",
                columns: table => new
                {
                    PhimId = table.Column<int>(type: "int", nullable: false),
                    TheLoaiId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhimTheLoai", x => new { x.PhimId, x.TheLoaiId });
                    table.ForeignKey(
                        name: "FK_PhimTheLoai_Phim_PhimId",
                        column: x => x.PhimId,
                        principalSchema: "Movie",
                        principalTable: "Phim",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PhimTheLoai_TheLoai_TheLoaiId",
                        column: x => x.TheLoaiId,
                        principalSchema: "Movie",
                        principalTable: "TheLoai",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PhimAnh_PhimId",
                schema: "Movie",
                table: "PhimAnh",
                column: "PhimId");

            migrationBuilder.CreateIndex(
                name: "IX_PhimTheLoai_TheLoaiId",
                schema: "Movie",
                table: "PhimTheLoai",
                column: "TheLoaiId");

            migrationBuilder.CreateIndex(
                name: "IX_PhimVideo_PhimId",
                schema: "Movie",
                table: "PhimVideo",
                column: "PhimId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PhimAnh",
                schema: "Movie");

            migrationBuilder.DropTable(
                name: "PhimTheLoai",
                schema: "Movie");

            migrationBuilder.DropTable(
                name: "PhimVideo",
                schema: "Movie");

            migrationBuilder.DropTable(
                name: "TheLoai",
                schema: "Movie");

            migrationBuilder.DropTable(
                name: "Phim",
                schema: "Movie");
        }
    }
}
