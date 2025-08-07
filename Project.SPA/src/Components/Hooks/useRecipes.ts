import { useEffect, useState } from "react";
import { Client } from "../../Client/Client";
import type { Recipe } from "../../Types/Recipe";
import { baseUrl } from "../../Settings";

interface UseRecipes {
    isLoading: boolean;
    recipes: Recipe[];
    addRecipe: (item: Recipe) => Promise<void>;
    editRecipe: (item: Recipe) => Promise<void>;
}

export function useRecipes(): UseRecipes {
    const client = new Client(baseUrl);
    function addRecipe(item: Recipe): Promise<void> {
        return client.addRecipe(item);
    }
    function editRecipe(item: Recipe): Promise<void> {
        return client.editRecipe(item);
    }
    const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        client.getRecipes().then(items => {
            setRecipes(items);
        }).finally(() => { setIsLoading(false) });
    }, []);

    return { isLoading, recipes, addRecipe, editRecipe }
}