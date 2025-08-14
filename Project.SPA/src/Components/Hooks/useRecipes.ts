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
    const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getRecipes().finally(() => { setIsLoading(false) });
    }, []);

    const client = new Client(baseUrl);
    function addRecipe(item: Recipe): Promise<void> {
        setIsLoading(true);
        return client.addRecipe(item).then((recipes) => { setRecipes(recipes); }).finally(() => { setIsLoading(false) });
    }
    function editRecipe(item: Recipe): Promise<void> {
        setIsLoading(true);
        return client.editRecipe(item).then((recipes) => { setRecipes(recipes); }).finally(() => { setIsLoading(false) });
    }
    function getRecipes() {
        return client.getRecipes().then(items => {
            setRecipes(items);
        })
    }

    return { isLoading, recipes, addRecipe, editRecipe }
}