import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { RecipeItem } from './RecipeItem';

export function RecipeList({ isLoading, recipes = [], onClick }: { isLoading: boolean, recipes: Recipe[]; onClick: (item: Recipe) => void | undefined; }) {
    return <div class="list-wrapper">
        <h3>Recipes</h3>
        <div class="list">
            <div>
                ID - Title - Ingredients - Instructions - Edit
            </div>
            <div>
                {
                    isLoading ? "Loading!" : recipes.map(x => (<RecipeItem key={x.id} item={x} onClick={onClick} />))}
            </div>
        </div>
    </div>
}
