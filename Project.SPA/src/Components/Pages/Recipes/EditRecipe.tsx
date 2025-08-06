import type React from 'react';
import { useRecipes } from '../../Hooks/useRecipes';
import type { Recipe } from '../../../Types/Recipe';
import { RecipeList } from './RecipeList';
import { RecipeForm } from './RecipeForm';
import { useState } from 'react';

export function EditRecipe() {
    const { recipes, editRecipe } = useRecipes();
    const [selected, setSelected] = useState<Recipe | undefined>(undefined);

    const handleClick: (item: Recipe) => void = (item) => {
        setSelected(item);
    }

    const handleSubmit = (item: Recipe) => {
        editRecipe(item)
    }

    return <div>
        <h2>Edit Recipe</h2>
        <RecipeList recipes={recipes} onClick={handleClick} />
        {selected && <RecipeForm recipe={selected} onSubmit={handleSubmit} />
        }
    </div>;
}
