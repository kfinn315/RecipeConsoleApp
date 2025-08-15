import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { Button } from '@mui/material';
import { useState } from 'react';

/**
 * If isLoading is true, show loading message
 * display props.recipes in the table
 * props.onClick is called when Edit anchor is clicked, passing the Recipe of the row clicked
 */
export function RecipeList({ isLoading = false, recipes = [], onClick }: { isLoading: boolean, recipes: Recipe[]; onClick: (item: Recipe) => void | undefined; }) {
    return <>
        {isLoading ? "Loading!" :
            <ul className="recipe-list">
                {recipes.map(x => <RecipeItem item={x} onClick={onClick} />)}
            </ul>
        }
    </>
}

function RecipeItem({ item, onClick }: { item: Recipe, onClick, expanded: boolean }) {
    const [expanded, setExpanded] = useState<boolean>(false);

    function toggleExpanded() {
        setExpanded(!expanded)
    }

    return <li>
        <div>
            <Button onClick={toggleExpanded}>
                {item.title}
            </Button>
            <i>
                {item.categories.join(' ')}
            </i>
            <Button onClick={() => { onClick(item) }}>Edit</Button>
            {expanded && <RecipeDetail item={item} />}
        </div>
    </li >
}

function RecipeDetail({ item }: { item: Recipe }) {
    // const [ingredients, setIngredients] = useState<string[]>(item.ingredients)
    return <ul>
        <li>
            Categories: {item.categories.join(', ')}
        </li>
        <li>
            <IngredientsList items={item.ingredients} />
        </li>
        <li>
            Instructions: {item.instructions}
        </li>
    </ul>
}

function IngredientsList({ items }: { items: string[] }) {
    return <>
        Ingredients:
        <ul>
            {items.map(x => <li>{x}</li>)}
        </ul>
    </>
}