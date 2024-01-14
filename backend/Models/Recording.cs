namespace backend.Models;

public class Recording
{
    public long Id { get; set; }
    public string Path { get; set; }
    public string Name { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public TimeSpan Duration { get; set; }
    public long Size { get; set; }

    public Recording() {}
    public Recording(long id, string path, string name, DateOnly startDate, DateOnly endDate, TimeOnly startTime, TimeOnly endTime, long size, TimeSpan duration)
    {
        Id = id;
        Path = path;
        Name = name;
        StartDate = startDate;
        EndDate = endDate;
        StartTime = startTime;
        EndTime = endTime;
        Size = size;
        Duration = duration;
    }



}
