using MainApp.Model;
using System.Reflection.Metadata.Ecma335;

namespace MainApp.Apis;

public static class FileBrowserApi
{

    public static void MapFileBrowserApis(this IEndpointRouteBuilder app, FileOptionsConfig configuration)
    {
        var group = app.MapGroup("browse").WithTags("browse");

        group.MapGet("{dir}/files", SearchFiles);
        if (configuration.SearchDirsEnabled)
        {
            group.MapGet("{dir}/dirs", (string dir) => "wow");
        }
    }

    public static async Task<object> SearchFiles(string dir, string ext = "*", string fileName = "*")
    {
        await Task.Delay(1);
        if (!Directory.Exists(dir))
        {
            return TypedResults.NotFound();
        }

        var d = new DirectoryInfo(dir);
        var files = d.GetFiles($"{fileName}.{ext}").Select(info =>
                                new FileInfoDTO(info.Name, info.DirectoryName, info.LastAccessTime, info.Length));

        return files;

    }
}
