import type { Category, Recipe, RecipeRequest } from './Types';

export async function processNewRecipe(item: RecipeRequest, categories: Category[], addCategories: (item: Category) => Promise<Category>, addRecipe: (item: Recipe) => Promise<Recipe>): Promise<void> {
  async function processRecipeCategories(items: (number | string)[]): Promise<number[]> {
    const itemsCopy = [...items];
    const newCategories = itemsCopy.filter(x => typeof x === "string");
    const categories = itemsCopy.filter(x => typeof x === 'number');
    const newIDs = await Promise.all(newCategories.map(async (name) => {
      return addCategory({ id: undefined, name });
    }));
    return [...categories, ...newIDs];
  }

  async function processAndSaveRecipe(item: RecipeRequest) {
    const categoryIDs = await processRecipeCategories(item.categories);
    const processedItem = { ...item, categories: categoryIDs };
    if (processedItem?.id !== undefined)
      await editRecipe(processedItem);

    else
      await addRecipe(processedItem);
  }

  await processAndSaveRecipe(item);

}
