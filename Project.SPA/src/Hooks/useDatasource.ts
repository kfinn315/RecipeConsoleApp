import { useEffect, useState } from "react";
import type { Category, Recipe, RecipeRequest, DisplayRecipe } from "../Types";
import { CategoryClient, RecipeClient, type Client } from "../Client";
import { baseUrl } from "../Configuration";

interface UseDatasource {
    isLoading: boolean;
    errorMessage?: string;
    clearErrorMessage: () => void;

    categories: {
        categories: Category[];
        addCategory: (item: Category) => Promise<number>;
        editCategory: (item: Category) => Promise<void>;
    };
    recipes: {
        recipes: DisplayRecipe[];
        addRecipe: (item: RecipeRequest) => Promise<number>;
        editRecipe: (item: RecipeRequest) => Promise<void>;
    }
}

export function useDatasource(categoryClient: Client<Category> = new CategoryClient(baseUrl), recipeClient: Client<Recipe> = new RecipeClient(baseUrl)): UseDatasource {
    const [categories, setCategories] = useState<Category[] | undefined>(undefined);
    const [recipes, setRecipes] = useState<DisplayRecipe[]>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        setIsLoading(true);
        categoryClient.get()
            .then(items => {
                setCategories(items);
            })
            .catch((reason: Error) => { setErrorMessage(reason.message); })
            .finally(() => { setIsLoading(false) });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        recipeClient.get().then(items => {
            const recipes = items?.map(r => combineRecipeWithCategories(r, categories));
            setRecipes(recipes);
        })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
    }, [categories]);


    /** Categories */

    function addCategory(item: Category): Promise<number> {
        setIsLoading(true);

        //@ts-expect-error id is expected to be returned in API response
        return categoryClient
            .add(item)
            .then(newCategory => {
                setCategories([...categories, newCategory]);

                return newCategory.id as unknown as number;
            })
            .catch((reason: Error) => { setErrorMessage(reason.message); })
            .finally(() => { setIsLoading(false) });
    }

    function editCategory(item: Category): Promise<void> {
        setIsLoading(true);
        return categoryClient
            .update(item)
            .then(c => setCategories([...categories?.filter(x => x.id !== c.id) ?? [], c]))
            .catch((reason: Error) => { setErrorMessage(reason.message); })
            .finally(() => { setIsLoading(false) });
    }


    function combineRecipeWithCategories(item: Recipe, categories: Category[]): Recipe & { categories: Category[] } {
        if (categories === undefined) {
            return { ...item }
        }
        const fullCategories = item.categories?.map(x => categories.find(y => y.id == x) ?? { id: x, name: "?" });
        item.categories = fullCategories;
        return item;
    }

    /** Recipes */

    async function processRecipe({ item, addCategory }: { item: RecipeRequest; addCategory: (item: Category) => Promise<Category>; addRecipe: (item: Recipe) => Promise<Recipe>; editRecipe: (item: Recipe) => Promise<Recipe>; }): Recipe {
        async function updateCategories({ ids = [], names = [] }: { ids: number[], names: string[] }): Promise<number[]> {
            async function addCategories(names: string[]) {
                return await Promise.all(names.map(async (name) => {
                    return addCategory({ id: undefined, name });
                }));
            }

            const newIDs = await addCategories(names);
            return [...ids, ...newIDs];
        }


        const categoryIDs = await updateCategories(item.categories);
        const processedItem = { ...item, categories: categoryIDs };
        return processedItem
    }

    async function addRecipe(item: RecipeRequest): Promise<number> {
        setIsLoading(true);
        const recipe = await processRecipe({ item, addCategory });
        return recipeClient.add(recipe)
            .then((recipe: Recipe) => { setRecipes([...recipes, recipe]); })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });

        return 0; //TODO
    }

    async function editRecipe(item: RecipeRequest): Promise<number> {
        setIsLoading(true);
        const recipe = await processRecipe({ item, addCategory });
        return recipeClient.update(recipe)
            .then((recipe: Recipe) => { setRecipes([...recipes?.filter(x => x.id !== recipe.id) ?? [], recipe]); })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
        return recipe.id;
    }

    function clearErrorMessage() {
        setErrorMessage(undefined);
    }
    return { recipes: { recipes, addRecipe, editRecipe }, categories: { categories, addCategory, editCategory }, clearErrorMessage, isLoading, errorMessage };
}
