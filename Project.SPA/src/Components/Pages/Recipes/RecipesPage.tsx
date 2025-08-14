import type React from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useRecipes } from '../../Hooks/useRecipes';
import { RecipeTable } from './RecipeTable';
import type { Recipe } from '../../../Types/Recipe';
import { ErrorBanner } from '../../ErrorBanner';
import { useCategories } from '../../Hooks/useCategories';
import { RecipeList } from './RecipeList';
import { RecipeFormDialog } from './Form/RecipeFormDialog';

/**
 * shows a list of Recipes
 * allows adding and editing of recipes
 * shows error message if client encounters error w/ API
 * updates to show latest recipes after adding or editing
 */
export function RecipesPage({ variant = "table" }: { variant?: "list" | "table" }) {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [selected, setSelected] = useState<Recipe | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>(undefined);
    const { isLoading, recipes, editRecipe, addRecipe } = useRecipes();
    const { isLoading: isLoadingCategories, categories } = useCategories();

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

    return <div className="recipes-page">
        <h2>Recipes {!showForm && <Button onClick={handleAddClick}>Add</Button>}</h2>
        {(isLoading || isLoadingCategories) && "Loading..."}
        {errorMessage && <ErrorBanner message={errorMessage} onClose={() => { setErrorMessage(undefined) }} />}
        {/* <RecipeFormCard show={showForm} onClose={handleFormClose} onSubmit={handleSubmit} categories={categories} item={selected} /> */}
        <RecipeFormDialog show={showForm} onClose={handleFormClose} onSubmit={handleSubmit} categories={categories} item={selected} />
        {variant == "list" ?
            <RecipeList recipes={recipes} isLoading={isLoading} onClick={handleClick} /> : <RecipeTable recipes={recipes} isLoading={isLoading} onClick={handleClick} />}
    </div>
}
