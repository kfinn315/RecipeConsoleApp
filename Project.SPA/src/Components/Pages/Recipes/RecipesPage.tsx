import type React from 'react';
import { useRecipes } from '../../Hooks/useRecipes';
import { RecipeTable } from './RecipeTable';
import { Button } from '@mui/material';
import { RecipeForm } from './RecipeForm';
import { useState } from 'react';
import type { Recipe } from '../../../Types/Recipe';

export function RecipesPage() {
    const { isLoading, recipes, editRecipe, addRecipe } = useRecipes();
    const [selected, setSelected] = useState<Recipe | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(false);
    // const [isSendingEdit, setIsSendingEdit] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(undefined);

    const handleClick: (item: Recipe) => void = (item) => {
        setSelected(item);
        setShowModal(true);
    }

    const handleSubmit = (item: Recipe) => {
        setIsSendingEdit(true);
        setShowModal(false);
        setTimeout(() => {
            if (item?.id)
                editRecipe(item).catch((reason) => { setErrorMessage(reason.message); });
            else
                addRecipe(item).catch((reason) => { setErrorMessage(reason.message); });
        }, 1000);

    }
    function handleAddClick() {
        setSelected(undefined);
        setShowModal(true);
    }

    return <div>
        <h2>Recipes</h2>
        {errorMessage}
        <div>
            <Button onClick={handleAddClick}>Add</Button>
        </div>
        <RecipeTable recipes={recipes} isLoading={isLoading} onClick={handleClick} />
        {showModal && <RecipeForm recipe={selected} onSubmit={handleSubmit} />}
    </div>
}
