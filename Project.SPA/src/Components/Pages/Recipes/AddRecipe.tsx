import type React from 'react';
import { RecipeForm } from './RecipeForm';
import { useRecipes } from '../../Hooks/useRecipes';

export function AddRecipe() {

    const { addRecipe } = useRecipes();
    const handleSubmit = (item: Recipe) => {
        addRecipe(item)
    }
    return <div>
        <h3>Add Recipe</h3>
        <RecipeForm onSubmit={handleSubmit} />
    </div>;
}
