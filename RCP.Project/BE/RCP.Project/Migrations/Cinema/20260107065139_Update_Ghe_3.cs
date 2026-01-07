using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Cinema
{
    /// <inheritdoc />
    public partial class Update_Ghe_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrangThaiDatGhe",
                schema: "cinema",
                table: "Ghe");

            migrationBuilder.CreateTable(
                name: "GheLichChieu",
                schema: "cinema",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdGhe = table.Column<int>(type: "int", nullable: false),
                    IdLichChieu = table.Column<int>(type: "int", nullable: false),
                    TrangThaiDatGhe = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_GheLichChieu", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ghe",
                schema: "cinema",
                table: "GheLichChieu",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GheLichChieu",
                schema: "cinema");

            migrationBuilder.AddColumn<int>(
                name: "TrangThaiDatGhe",
                schema: "cinema",
                table: "Ghe",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
