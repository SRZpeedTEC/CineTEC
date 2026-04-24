namespace CineTec.Api.Helpers;

/// <summary>
/// Resolves storage file paths independently from the current working directory.
/// </summary>
public static class StoragePathHelper
{
    /// <summary>
    /// Resolves a JSON storage file inside the project's dataBase folder.
    /// </summary>
    /// <param name="fileName">The JSON file name.</param>
    /// <returns>The absolute path for the storage file.</returns>
    public static string GetStorageFilePath(string fileName)
    {
        var projectDirectory = FindProjectDirectory();
        return Path.Combine(projectDirectory, "dataBase", fileName);
    }

    private static string FindProjectDirectory()
    {
        var candidates = new[]
        {
            AppContext.BaseDirectory,
            Directory.GetCurrentDirectory(),
        };

        foreach (var candidate in candidates)
        {
            var directory = new DirectoryInfo(candidate);

            while (directory is not null)
            {
                var dataBaseDirectory = Path.Combine(directory.FullName, "dataBase");
                var projectFile = Path.Combine(directory.FullName, "CineTec.Api.csproj");

                if (Directory.Exists(dataBaseDirectory) && File.Exists(projectFile))
                {
                    return directory.FullName;
                }

                directory = directory.Parent;
            }
        }

        throw new DirectoryNotFoundException("Could not locate the CineTec.Api project directory.");
    }
}
