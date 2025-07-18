namespace RecipeConsoleApp.CLI.Exceptions;

[Serializable]
internal class NoCategoriesException : Exception
{
    public NoCategoriesException()
    {
    }

    public NoCategoriesException(string? message) : base(message)
    {
    }

    public NoCategoriesException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}