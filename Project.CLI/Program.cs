using Project.CLI;
using Project.Core.Entities;
using Project.Infrastructure.Database;
using Project.Infrastructure.Repositories;

var categoryDatastore = new JsonDataStorage<List<Category>>(new FileStreamIO("Project.Infrastructure/Data/categories.json"));
var categoryRepo = new CategoryListRepository(categoryDatastore);

var recipeDatastore = new JsonDataStorage<List<Recipe>>(new FileStreamIO("Project.Infrastructure/Data/recipes.json"));
var recipeRepo = new RecipeListRepository(recipeDatastore);

ProgramCLI.Run(categoryRepo, recipeRepo);
