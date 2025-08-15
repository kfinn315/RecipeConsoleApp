import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import { useState } from 'react';

/**
 * If isLoading is true, show loading message
 * display props.recipes in the table
 * props.onClick is called when Edit anchor is clicked, passing the Recipe of the row clicked
 */
export function RecipeCards({ isLoading = false, recipes = [], onClick }: { isLoading: boolean, recipes: Recipe[]; onClick: (item: Recipe) => void | undefined; }) {
    return <>
        {isLoading ? "Loading!" :
            <div className="cards">
                {recipes.map(x => <RecipeCard key={x.id} item={x} onEdit={() => { onClick(x) }} />)}
            </div>
        }
    </>
}

function RecipeCard({ item, onEdit }: { item: Recipe, onEdit }) {
    const [isMaximized, setIsMaximized] = useState<boolean>(false);
    const maxToggleHandler = () => {
        setIsMaximized((max) => !max);
    }
    return <Card onClick={maxToggleHandler} className={`card ${isMaximized && 'card-max'}`} variant='elevation'>
        <CardContent className='card-content'>
            <div className='card-title'>{item.title}</div>
            <IngredientsDisplay items={item.ingredients} />
            <InstructionsDisplay items={item.instructions} />
            <CategoriesDisplay items={item.categories} />
        </CardContent>
        <CardActions className="card-actions" >
            <Button variant='outlined' onClick={onEdit}>Edit Recipe</Button>
        </CardActions>
    </Card >
}
function CategoriesDisplay({ items }: { items }) {
    return <i>{items?.join(', ')}</i>
}
function InstructionsDisplay({ item }: { item?: string }) {
    return <div>
        {item == undefined && <i>No instructions yet.</i> || "Instructions: " + item}
    </div>
}
function IngredientsDisplay({ items = [] }: { items?: string[] }) {
    return <div>
        {(items?.length === 0) ? <i>No Ingredients yet.</i> : <>Ingredients: <ul>
            {items?.map((ingredient, ix) => <li key={ix}>{ingredient}</li>)}
        </ul></>
        }
    </div>
}