import { useEffect, useState } from "react";
import { Client } from "../Client/Client";
import type { Recipe } from "../Types/Recipe";
import { baseUrl } from "../Settings";

interface UseRecipes {
    isLoading: boolean;
    recipes: Recipe[];
    addRecipe: (item: Recipe) => Promise<void>;
    editRecipe: (item: Recipe) => Promise<void>;
    errorMessage?: string;
    dismissErrorMessage: () => void;
}

export function useRecipes(client = new Client(baseUrl)): UseRecipes {
    const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        setIsLoading(true);
        getRecipes()
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
    }, []);

    function addRecipe(item: Recipe): Promise<void> {
        setIsLoading(true);
        return client.addRecipe(item)
            .then((recipe: Recipe) => { setRecipes([...recipes, recipe]); })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
    }
    function editRecipe(item: Recipe): Promise<void> {
        setIsLoading(true);
        return client.updateRecipe(item)
            .then((recipe: Recipe) => { setRecipes([...recipes?.filter(x => x.id !== recipe.id) ?? [], recipe]); })
            .catch((reason: Error) => { setErrorMessage(reason.message) })
            .finally(() => { setIsLoading(false) });
    }
    function getRecipes() {
        return client.getRecipes().then(items => {
            setRecipes(items);
        })
    }

    function dismissErrorMessage() {
        setErrorMessage(undefined);
    }

    return { errorMessage, isLoading, recipes, addRecipe, editRecipe, dismissErrorMessage }
}