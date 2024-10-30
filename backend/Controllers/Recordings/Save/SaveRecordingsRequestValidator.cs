using System.Globalization;
using FluentValidation;

namespace backend.Controllers.Recordings.Save;

public sealed class SaveRecordingsRequestValidator : AbstractValidator<SaveRecordingsRequest>
{
    public SaveRecordingsRequestValidator()
    {
        RuleFor(x => x.StartDate)
            .Must(BeAValidDate)
            .WithMessage("StartDate must be a valid date in the format yyyy-MM-dd");

        RuleFor(x => x.StartTime)
            .Must(BeAValidTime)
            .WithMessage("StartTime must be a valid time in the format HH:mm:ss");

        RuleFor(x => x.EndDate)
            .Must(BeAValidDate)
            .WithMessage("EndDate must be a valid date in the format yyyy-MM-dd");

        RuleFor(x => x.EndTime)
            .Must(BeAValidTime)
            .WithMessage("EndTime must be a valid time in the format HH:mm:ss");
    }

    private static bool BeAValidDate(string date)
    {
        if (date is not string stringValue)
            return false;
        return DateTime.TryParseExact(stringValue, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _);
    }

    private static bool BeAValidTime(string time)
    {
        if (time is not string stringValue)
            return false;
        return DateTime.TryParseExact(stringValue, "HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out _);
    }
}
