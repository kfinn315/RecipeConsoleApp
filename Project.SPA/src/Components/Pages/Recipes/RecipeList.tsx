import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { RecipeItem } from './RecipeItem';

export function RecipeList({ recipes = [], onClick }: { recipes: Recipe[]; onClick: (item: Recipe) => void | undefined; }) {
    return <div>
        {recipes.map(x => (<RecipeItem key={x.Id} item={x} onClick={onClick} />))}
    </div>;
}
