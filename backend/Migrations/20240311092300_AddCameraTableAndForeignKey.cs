using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddCameraTableAndForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Channel",
                table: "Events");

            migrationBuilder.AddColumn<long>(
                name: "CameraId",
                table: "Events",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Cameras",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cameras", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_CameraId",
                table: "Events",
                column: "CameraId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Cameras_CameraId",
                table: "Events",
                column: "CameraId",
                principalTable: "Cameras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Cameras_CameraId",
                table: "Events");

            migrationBuilder.DropTable(
                name: "Cameras");

            migrationBuilder.DropIndex(
                name: "IX_Events_CameraId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CameraId",
                table: "Events");

            migrationBuilder.AddColumn<byte>(
                name: "Channel",
                table: "Events",
                type: "smallint",
                nullable: false,
                defaultValue: (byte)0);
        }
    }
}
