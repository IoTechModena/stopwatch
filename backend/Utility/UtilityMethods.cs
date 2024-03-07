namespace backend.Utility;

public static class UtilityMethods
{
    // Collection of utility methods
    public static string FormatDate(string date)
    {
        // This method formats a date from yyyy-mm-dd to yyyymmdd
        string[] dateParts = date.Split("-");
        string formattedDate = dateParts[0] + dateParts[1] + dateParts[2];
        return formattedDate;
    }

    public static string FormatTime(string time)
    {
        // This method formats a time from hh:mm:ss to hhmmss
        string[] timeParts = time.Split(":");
        string formattedTime = timeParts[0] + timeParts[1] + timeParts[2];
        return formattedTime;
    }

    public static Dictionary<string, string> ParseResponse(string response)
    {
        var lines = response.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
        var values = new Dictionary<string, string>();

        foreach (var line in lines)
        {
            var parts = line.Split('=');
            if (parts.Length == 2)
                values[parts[0]] = parts[1];
        }
        
        return values;
    }
}
