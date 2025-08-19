import type React from 'react';
import { useState } from 'react';
import { RecipeTable } from './RecipeTable';
import type { Recipe } from '../../../Types/Recipe';
import { RecipeList } from './RecipeList';
import { RecipeFormDialog } from './Form/RecipeFormDialog';
import { RecipeCards } from './Card/RecipeCards';
import { RecipeDialog } from './RecipeDialog';
import type { Category } from '../../../Types/Category';

/**
 * shows a list of Recipes
 * allows adding and editing of recipes
 * shows error message if client encounters error w/ API
 * updates to show latest recipes after adding or editing
 */
export function RecipesPage({ addRecipe, categories, editRecipe, isLoading, recipes, variant = "table" }: { recipes: Recipe[], categories: Category[], isLoading: boolean, editRecipe, addRecipe, variant?: "list" | "table" | "cards" }) {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [selected, setSelected] = useState<Recipe | undefined>(undefined);

    const handleEdit: (item: Recipe) => void = (item) => {
        setSelected(item);
        setShowForm(true);
    }

    const handleDetailClick: (item: Recipe) => void = (item) => {
        setSelected(item);
        setShowDetail(item);
    }


    const handleSubmit = (item: Recipe) => {
        setShowForm(false);
        setTimeout(() => {
            if (item?.id)
                editRecipe(item);
            else
                addRecipe(item);
        }, 1000);
    }

    function handleFormClose() {
        setSelected(undefined);
        setShowForm(false);
    }

    const getRecipes = (variant) => {
        switch (variant) {
            case 'list': return <RecipeList recipes={recipes} isLoading={isLoading} onClick={handleEdit} />;
            case 'cards': return <RecipeCards recipes={recipes} isLoading={isLoading} onEdit={handleEdit} onClick={handleDetailClick} />;
            case 'table':
            default: return <RecipeTable recipes={recipes} isLoading={isLoading} onClick={handleEdit} />;
        }
    }

    return <div className="recipes-page">
        <h3 className={"title"}>Recipes ({recipes?.length ?? 0})</h3>
        {(isLoading) && "Loading..."}
        <RecipeFormDialog show={showForm} onClose={handleFormClose} onSubmit={handleSubmit} categories={categories} item={selected} />
        <RecipeDialog item={selected} open={showDetail} onClose={() => { setShowDetail((show) => !show) }} onEdit={() => { handleEdit(selected); setShowDetail(false); }} />
        {getRecipes(variant)}
    </div>
}
