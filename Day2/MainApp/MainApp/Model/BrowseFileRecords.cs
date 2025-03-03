namespace MainApp.Model;
public record DirectoryDTO(string DirectoryName, DateTime LastAccessTime);
public record FileInfoDTO(string FileName, string? DirectoryName, DateTime LastAccessTime, long Length);

