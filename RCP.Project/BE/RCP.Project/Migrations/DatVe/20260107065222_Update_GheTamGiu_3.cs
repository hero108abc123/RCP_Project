using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.DatVe
{
    /// <inheritdoc />
    public partial class Update_GheTamGiu_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdLichChieu",
                schema: "ve",
                table: "GheTamGiu",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdLichChieu",
                schema: "ve",
                table: "GheTamGiu");
        }
    }
}
