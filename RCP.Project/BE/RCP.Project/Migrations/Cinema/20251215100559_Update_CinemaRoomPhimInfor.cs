using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RCP.Project.Migrations.Cinema
{
    /// <inheritdoc />
    public partial class Update_CinemaRoomPhimInfor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdRoom",
                schema: "cinema",
                table: "CinemaRoomMovieInfor",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdRoom",
                schema: "cinema",
                table: "CinemaRoomMovieInfor");
        }
    }
}
