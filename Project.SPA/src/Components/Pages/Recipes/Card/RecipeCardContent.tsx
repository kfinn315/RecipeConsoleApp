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
        {/* Categories:&nbsp; */}
        {/* {items?.length == undefined && <i>No Categories.</i>} */}
        <ul>
            {items.map(x => <li className="pill">{x}</li>)}
        </ul>
    </div >;
}
function InstructionsDisplay({ item }: { item?: string }) {
    return <div className="card-section">
        Instructions:&nbsp;
        <ul>
            {item == undefined && <i>No instructions yet.</i> || <li>{item}</li>}
        </ul>
    </div>
}
function IngredientsDisplay({ items = [] }: { items?: string[] }) {
    return <div className="card-section">
        Ingredients:&nbsp;
        <ul>
            {(items?.length === 0) ? <i>No Ingredients yet.</i> : items?.map((ingredient, ix) => <li key={ix}>{ingredient}</li>)}
        </ul>
    </div>
}