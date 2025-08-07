import type React from 'react';
import { useRecipes } from '../../Hooks/useRecipes';
import type { Recipe } from '../../../Types/Recipe';
import { RecipeList } from './RecipeList';
import { RecipeForm } from './RecipeForm';
import { useState } from 'react';

export function EditRecipePage() {
    const { isLoading, recipes, editRecipe } = useRecipes();
    const [selected, setSelected] = useState<Recipe | undefined>(undefined);
    const [isSendingEdit, setIsSendingEdit] = useState<boolean>(false);

    const handleClick: (item: Recipe) => void = (item) => {
        setSelected(item);
    }

    const handleSubmit = (item: Recipe) => {
        setIsSendingEdit(true);
        setTimeout(() => {
            editRecipe(item).finally(() => setIsSendingEdit(false));
        }, 1000);

    }

    return <div>
        <h2>Edit Recipe</h2>
        {
            isLoading ? "Loading!" : <RecipeList recipes={recipes} onClick={handleClick} />
        }
        {
            selected && !isSendingEdit && <RecipeForm recipe={selected} onSubmit={handleSubmit} />
        }
        {isSendingEdit && "Submitting your edits!"}
    </div>;
}
