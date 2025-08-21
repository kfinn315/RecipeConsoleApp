import { useEffect, useState } from "react";
import { RecipeClient } from "../Client";
import type { Recipe } from "../Types";
import { baseUrl } from "../Configuration";

interface UseRecipes {
    isLoading: boolean;
    recipes: Recipe[];
    addRecipe: (item: Recipe) => Promise<void>;
    editRecipe: (item: Recipe) => Promise<void>;
    errorMessage?: string;
    clearErrorMessage: () => void;
}

export function useRecipes(client: RecipeClient = new RecipeClient(baseUrl)): UseRecipes {
    const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

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

    return { errorMessage, isLoading, recipes, addRecipe, editRecipe, clearErrorMessage }
}