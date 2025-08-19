import type React from 'react';
import type { Recipe } from '../../../../Types/Recipe';
import { RecipeCard } from './RecipeCard';

/**
 * If isLoading is true, show loading message
 * display props.recipes in the table
 * props.onClick is called when Edit anchor is clicked, passing the Recipe of the row clicked
 */
export function RecipeCards({ isLoading = false, recipes = [], onEdit, onClick }: { isLoading: boolean, recipes: Recipe[]; onEdit?: (item: Recipe) => void; onClick?: (item: Recipe) => void; }) {
    return <>
        {isLoading ? "Loading!" :
            <div className="cards">
                {recipes.map(x => <RecipeCard key={x.id} item={x} onClick={() => { onClick?.(x) }} onEdit={() => { onEdit?.(x) }} />)}
            </div>
        }
    </>
}
