import { useEffect, useState } from "react";
import { type Client, RecipeClient } from "../Client";
import type { Recipe, RecipeRequest } from "../Types";
import { baseUrl } from "../Configuration";
import { useCategories } from "./useCategories";

interface UseRecipes {
    isLoading: boolean;
    recipes: Recipe[];
    addRecipe: (item: Recipe) => Promise<void>;
    editRecipe: (item: Recipe) => Promise<void>;
    errorMessage?: string;
    clearErrorMessage: () => void;
    processAndSaveRecipe: (item: RecipeRequest) => Promise<void>;
}

export function useRecipes(client: Client<Recipe> = new RecipeClient(baseUrl)): UseRecipes {
    const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { processRecipeCategories } = useCategories();

    useEffect(() => {
        setIsLoading(true);
        client.get().then(items => {
            setRecipes(items);
        })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
    }, []);

    function addRecipe(item: Recipe): Promise<void> {
        setIsLoading(true);
        return client.add(item)
            .then((recipe: Recipe) => { setRecipes([...recipes, recipe]); })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
    }
    function editRecipe(item: Recipe): Promise<void> {
        setIsLoading(true);
        return client.update(item)
            .then((recipe: Recipe) => { setRecipes([...recipes?.filter(x => x.id !== recipe.id) ?? [], recipe]); })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
    }

    function clearErrorMessage() {
        setErrorMessage(undefined);
    }

    function processAndSaveRecipe(item: RecipeRequest) {
        const categoryIDs = processRecipeCategories(item.categories);
        const processedItem = { ...item, categories: categoryIDs };
        if (processedItem?.id !== undefined)
            editRecipe(processedItem);
        else
            addRecipe(processedItem);
    }

    return { processAndSaveRecipe, errorMessage, isLoading, recipes, addRecipe, editRecipe, clearErrorMessage }
}