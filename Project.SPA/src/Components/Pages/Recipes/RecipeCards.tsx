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
    return <Card className={`card ${isMaximized && 'card-max'}`} variant='elevation'>
        <CardContent>
            {item.title}
            <ul>
                <li>
                    Categories: {item.categories?.join(', ')}
                </li>
                <li>
                    <IngredientsList items={item.ingredients} />
                </li>
                <li>
                    Instructions: {item.instructions}
                </li>
            </ul>
        </CardContent>
        <CardActions style={{ "justifyContent": "center" }}>
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={maxToggleHandler}>{isMaximized ? "Minimize" : "Maximize"}</Button>
        </CardActions>
    </Card >
}


function IngredientsList({ items }: { items: string[] }) {
    return <>
        Ingredients:
        <ul>
            {items?.map(x => <li>{x}</li>)}
        </ul>
    </>
}