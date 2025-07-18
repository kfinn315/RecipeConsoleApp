using RecipeConsoleApp.CLI;
using RecipeConsoleApp.Core.Entities;
using RecipeConsoleApp.Infrastructure.Database;
using RecipeConsoleApp.Infrastructure.Repositories;
using Spectre.Console;

AnsiConsole.MarkupLine("[underline red]Welcome[/] to the Recipe Console App!");
var categoryDatastore = new JsonDataStorage<List<Category>>(new FileStreamIO("./Infrastructure/Data/categories.json"));
var categoryRepo = new CategoryListRepository(categoryDatastore);

var recipeDatastore = new JsonDataStorage<List<Recipe>>(new FileStreamIO("./Infrastructure/Data/recipes.json"));
var recipeRepo = new RecipeListRepository(recipeDatastore);

ProgramCLI.Run(categoryRepo, recipeRepo);
