using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AdoptDateTimeInRecording : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Recordings");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Recordings");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Recordings");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Recordings");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDateTime",
                table: "Recordings",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDateTime",
                table: "Recordings",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDateTime",
                table: "Recordings");

            migrationBuilder.DropColumn(
                name: "StartDateTime",
                table: "Recordings");

            migrationBuilder.AddColumn<DateOnly>(
                name: "EndDate",
                table: "Recordings",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "EndTime",
                table: "Recordings",
                type: "time without time zone",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<DateOnly>(
                name: "StartDate",
                table: "Recordings",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "StartTime",
                table: "Recordings",
                type: "time without time zone",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }
    }
}
