namespace backend.Utility;

public static class UtilityMethods
{
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
