using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Cinema
{
    /// <inheritdoc />
    public partial class Update_Room : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoLuongGheVip",
                schema: "cinema",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "KhuVuc",
                schema: "cinema",
                table: "Ghe");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SoLuongGheVip",
                schema: "cinema",
                table: "Room",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "KhuVuc",
                schema: "cinema",
                table: "Ghe",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
