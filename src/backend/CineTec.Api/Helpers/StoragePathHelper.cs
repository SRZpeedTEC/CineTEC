namespace CineTec.Api.Helpers;

/// <summary>
/// Resolves storage file paths from the application's deployed content root.
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
        return Path.Combine(AppContext.BaseDirectory, "dataBase", fileName);
    }
}
