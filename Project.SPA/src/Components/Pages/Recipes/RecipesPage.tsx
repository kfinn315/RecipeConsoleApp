import type React from 'react';
import { useRecipes } from '../../Hooks/useRecipes';
import { RecipeTable } from './RecipeTable';
import { Button } from '@mui/material';
import { useState } from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { ErrorBanner } from '../../ErrorBanner';
import { RecipeFormDialog } from './RecipeFormDialog';

/**
 * shows a list of Recipes
 * allows adding and editing of recipes
 * shows error message if client encounters error w/ API
 * updates to show latest recipes after adding or editing
 */
export function RecipesPage() {
    const { isLoading, recipes, editRecipe, addRecipe } = useRecipes();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [selected, setSelected] = useState<Recipe | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>(undefined);

    const handleClick: (item: Recipe) => void = (item) => {
        setSelected(item);
        setShowForm(true);
    }

    const handleSubmit = (item: Recipe) => {
        setShowForm(false);
        setTimeout(() => {
            if (item?.id)
                editRecipe(item).catch((reason) => { setErrorMessage(reason.message); });
            else
                addRecipe(item).catch((reason) => { setErrorMessage(reason.message); });
        }, 1000);

    }

    function handleAddClick() {
        setSelected(undefined);
        setShowForm(true);
    }

    function handleFormClose() {
        setSelected(undefined);
        setShowForm(false);
    }
    return <div>
        <h2>Recipes</h2>
        <ErrorBanner message={errorMessage} />
        <div>
            <Button onClick={handleAddClick}>Add</Button>
        </div>
        <RecipeTable recipes={recipes} isLoading={isLoading} onClick={handleClick} />
        <RecipeFormDialog open={showForm} item={selected} onSubmit={handleSubmit} isAdd={selected == undefined} onClose={handleFormClose} />
    </div>
}
