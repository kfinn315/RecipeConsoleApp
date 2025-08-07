import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { RecipeItem } from './RecipeItem';

export function RecipeList({ recipes = [], onClick }: { recipes: Recipe[]; onClick: (item: Recipe) => void | undefined; }) {
    return <div class="list">
        {recipes.map(x => (<RecipeItem key={x.id} item={x} onClick={onClick} />))}
    </div>;
}
