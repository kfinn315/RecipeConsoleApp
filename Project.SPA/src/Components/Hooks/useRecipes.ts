import { useEffect, useState } from "react";
import { Client } from "../../Client/Client";
import type { Recipe } from "../../Types/Recipe";
import { baseUrl } from "../../Settings";

export function useRecipes(): { recipes: Recipe[], addRecipe: (item: Recipe) => Promise<void>, editRecipe: (item: Recipe) => Promise<void> } {
    const client = new Client(baseUrl);
    function addRecipe(item: Recipe): Promise<void> {
        return client.addRecipe(item);
    }
    function editRecipe(item: Recipe): Promise<void> {
        return client.editRecipe(item);
    }
    const [recipes, setRecipes] = useState<Recipe[] | undefined>([]);

    useEffect(() => {
        client.getRecipes().then(items => setRecipes(items));
    }, []);

    return { recipes, addRecipe, editRecipe }
}