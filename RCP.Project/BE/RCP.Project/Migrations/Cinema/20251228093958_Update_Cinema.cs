using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Cinema
{
    /// <inheritdoc />
    public partial class Update_Cinema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UrlAnhCinema",
                schema: "cinema",
                table: "Cinema",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UrlAnhCinema",
                schema: "cinema",
                table: "Cinema");
        }
    }
}
