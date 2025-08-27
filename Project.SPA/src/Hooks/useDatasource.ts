import { useEffect, useState } from "react";
import type { Category, Recipe, DisplayRecipe, OptionalID } from "../Types";
import { CategoryClient, RecipeClient } from "../Client";
import { baseUrl } from "../Configuration";

interface UseDatasource {
    isLoading: boolean;
    errorMessage?: string;
    clearErrorMessage: () => void;

    categories: {
        categories: Category[];
        addCategory: (item: OptionalID<Category>) => Promise<number>;
        editCategory: (item: Category) => Promise<void>;
    };
    recipes: {
        recipes: DisplayRecipe[];
        addRecipe: (item: OptionalID<Recipe>, pendingCategories?: string[]) => Promise<void>;
        editRecipe: (item: Recipe, pendingCategories?: string[]) => Promise<void>;
    }
}

export function useDatasource(categoryClient: CategoryClient = new CategoryClient(baseUrl), recipeClient: RecipeClient = new RecipeClient(baseUrl)): UseDatasource {
    const [categories, setCategories] = useState<Category[] | undefined>(undefined);
    const [recipes, setRecipes] = useState<DisplayRecipe[] | undefined>(undefined);
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

    function addCategory(item: OptionalID<Category>): Promise<number> {
        setIsLoading(true);

        //@ts-expect-error id is expected to be returned in API response
        return categoryClient
            .add(item)
            .then(newCategory => {
                setCategories([...(categories ?? []), newCategory]);

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

    function combineRecipeWithCategories(item: Recipe, categories?: Category[]): DisplayRecipe {
        if (categories === undefined) {
            return { ...item, categories: [] }
        }
        const fullCategories: Category[] = item.categories?.map(cid => categories.find(c2 => c2.id == cid) ?? { id: cid, name: "?" });
        return { ...item, categories: fullCategories };
    }

    /** Recipes */
    async function updateCategories(ids: number[] = [], names: string[] = []): Promise<number[]> {
        async function addCategories(names: string[]) {
            return await Promise.all(names.map(async (name) => {
                return addCategory({ id: undefined, name });
            }));
        }

        const newIDs = await addCategories(names);
        return [...ids, ...newIDs];
    }

    async function addRecipe(item: OptionalID<Recipe>, pendingCategories?: string[]): Promise<void> {
        setIsLoading(true);
        const categoryIDs = await updateCategories(item.categories, pendingCategories);
        const recipeWithCategories = { ...item, categories: categoryIDs };
        return recipeClient.add(recipeWithCategories)
            .then((recipe: Recipe) => {
                const displayRecipe = combineRecipeWithCategories(recipe, categories);
                setRecipes([...(recipes ?? []), displayRecipe]);
            })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
    }

    async function editRecipe(item: Recipe, pendingCategories?: string[]): Promise<void> {
        setIsLoading(true);
        const categoryIDs = await updateCategories(item.categories, pendingCategories);
        const updateRecipe: Recipe = { ...item, categories: categoryIDs };
        return recipeClient.update(updateRecipe)
            .then((recipe: Recipe) => {
                const displayRecipe = combineRecipeWithCategories(recipe, categories);
                setRecipes([...recipes?.filter(x => x.id !== updateRecipe.id) ?? [], displayRecipe]);
            })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
    }

    function clearErrorMessage() {
        setErrorMessage(undefined);
    }
    
    return {
        recipes: { recipes: recipes ?? [], addRecipe, editRecipe }, categories: { categories: categories ?? [], addCategory, editCategory }, clearErrorMessage, isLoading, errorMessage
    };
}
