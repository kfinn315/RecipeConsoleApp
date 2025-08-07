import type React from 'react';
import { useRecipes } from '../../Hooks/useRecipes';
import { RecipeList } from './RecipeList';



export function ListRecipesPage() {
    const { isLoading, recipes } = useRecipes();
    return <div>
        <h2>List Recipes</h2>
        <RecipeList recipes={recipes} isLoading={isLoading} />
    </div>
}
