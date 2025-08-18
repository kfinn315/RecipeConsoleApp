import { CardContent } from "@mui/material";
import type { Recipe } from "../../../../Types";

export function RecipeCardContent({ item, onClick }: { item: Recipe, onClick }) {
    return <CardContent onClick={onClick} className='card-content recipe-card-content'>
        <div className='card-title'>{item.title}</div>
        <IngredientsDisplay items={item.ingredients} />
        <InstructionsDisplay items={item.instructions} />
        <CategoriesDisplay items={item.categories} />
    </CardContent>
}

function CategoriesDisplay({ items = [] }: { items?: number[] }) {
    return <div className="card-section">
        {items?.length == undefined && <i>No Categories.</i> || "Categories: "}
        <i>{items?.join(', ')}</i>
    </div>;
}
function InstructionsDisplay({ item }: { item?: string }) {
    return <div className="card-section">
        {item == undefined && <i>No instructions yet.</i> || "Instructions: " + item}
    </div>
}
function IngredientsDisplay({ items = [] }: { items?: string[] }) {
    return <div className="card-section">
        {(items?.length === 0) ? <i>No Ingredients yet.</i> : <>Ingredients: <ul>
            {items?.map((ingredient, ix) => <li key={ix}>{ingredient}</li>)}
        </ul></>
        }
    </div>
}