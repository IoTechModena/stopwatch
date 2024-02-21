using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace backend.Validation;

public class DateAttribute : ValidationAttribute
{
    public DateAttribute()
    {
        ErrorMessage = "The field {0} must be a valid date in the format yyyy-MM-dd.";
    }

    public override bool IsValid(object? value)
    {
        if (value is not string stringValue)
        {
            return false;
        }
        return DateTime.TryParseExact(stringValue, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _);
    }

}