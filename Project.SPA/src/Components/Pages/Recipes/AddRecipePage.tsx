import type React from 'react';
import { RecipeForm } from './RecipeForm';
import { useRecipes } from '../../Hooks/useRecipes';
import { useState } from 'react';

export function AddRecipePage() {

    const { addRecipe } = useRecipes();
    const [isSendingAdd, setIsSendingAdd] = useState<boolean>(false);
    const [error, setError] = useState<string>(undefined);
    const handleSubmit = (item: Recipe) => {
        setIsSendingAdd(true);
        setTimeout(() => {
            addRecipe(item).catch((reason) => setError(JSON.stringify(reason.message))).finally(() => { setIsSendingAdd(false); })
        }, 1000);
    }

    return <div>
        <h2>Add Recipe</h2>
        {error !== undefined ? <div>{error}</div> : ""}
        {!isSendingAdd ? <RecipeForm onSubmit={handleSubmit} /> : "Sending your recipe!"}
    </div>;
}
