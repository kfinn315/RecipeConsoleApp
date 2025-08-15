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
import { RecipeCards } from './RecipeCards';

/**
 * shows a list of Recipes
 * allows adding and editing of recipes
 * shows error message if client encounters error w/ API
 * updates to show latest recipes after adding or editing
 */
export function RecipesPage({ variant = "table" }: { variant?: "list" | "table" | "cards" }) {
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

    const getRecipes = (variant) => {
        switch (variant) {
            case 'list': return <RecipeList recipes={recipes} isLoading={isLoading} onClick={handleClick} />;
            case 'cards': return <RecipeCards recipes={recipes} isLoading={isLoading} onClick={handleClick} />;
            case 'table':
            default: return <RecipeTable recipes={recipes} isLoading={isLoading} onClick={handleClick} />;
        }
    }

    return <div className="recipes-page">
        <h3>Recipes ({recipes?.length ?? 0})</h3>
        {(isLoading || isLoadingCategories) && "Loading..."}
        {errorMessage && <ErrorBanner message={errorMessage} onClose={() => { setErrorMessage(undefined) }} />}
        {/* <RecipeFormCard show={showForm} onClose={handleFormClose} onSubmit={handleSubmit} categories={categories} item={selected} /> */}
        <RecipeFormDialog show={showForm} onClose={handleFormClose} onSubmit={handleSubmit} categories={categories} item={selected} />
        {getRecipes(variant)}
    </div>
}
