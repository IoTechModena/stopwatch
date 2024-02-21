using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace backend.Validation;

public class TimeAttribute : ValidationAttribute
{
    public TimeAttribute()
    {
        ErrorMessage = "The field {0} must be a valid time in the format HH:mm:ss.";
    }

    public override bool IsValid(object? value)
    {
        if (value is not string stringValue)
        {
            return false;
        }
        return DateTime.TryParseExact(stringValue, "HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out _);
    }

}