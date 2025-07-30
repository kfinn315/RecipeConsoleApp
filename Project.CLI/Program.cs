using RecipeConsoleApp.CLI;
using RecipeConsoleApp.Core.Entities;
using RecipeConsoleApp.Infrastructure.Database;
using RecipeConsoleApp.Infrastructure.Repositories;

var categoryDatastore = new JsonDataStorage<List<Category>>(new FileStreamIO("Project.Infrastructure/Data/categories.json"));
var categoryRepo = new CategoryListRepository(categoryDatastore);

var recipeDatastore = new JsonDataStorage<List<Recipe>>(new FileStreamIO("Project.Infrastructure/Data/recipes.json"));
var recipeRepo = new RecipeListRepository(recipeDatastore);

ProgramCLI.Run(categoryRepo, recipeRepo);
