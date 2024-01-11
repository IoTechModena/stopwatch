namespace backend.Models;

public class FileDownload
{
    private long id;
    private long size;
    private TimeSpan duration;
    private string filePath;
    private string fileName;

    public FileDownload() { }

    public FileDownload(long id, long size, TimeSpan duration, string filePath, string fileName)
    {
        this.Id = id;
        this.Size = size;
        this.Duration = duration;
        this.filePath = filePath;
        this.fileName = fileName;
    }

    public long Id { get => id; set => id = value; }
    public long Size { get => size; set => size = value; }
    public TimeSpan Duration { get => duration; set => duration = value; }
    public string FilePath { get => filePath; set => filePath = value; }
    public string FileName { get => fileName; set => fileName = value; }
}
