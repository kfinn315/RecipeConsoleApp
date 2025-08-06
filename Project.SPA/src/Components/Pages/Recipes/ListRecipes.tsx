import type React from 'react';
import { useRecipes } from '../../Hooks/useRecipes';
import { RecipeList } from './RecipeList';



export function ListRecipes() {
    const { recipes } = useRecipes();
    return <div>
        <h3>List Recipes</h3>
        <div>
            <RecipeList recipes={recipes} />
        </div>
    </div>
}
