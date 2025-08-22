import { CardContent } from "@mui/material";
import type { Category, DisplayRecipe } from "../../../../Types";

export function RecipeCardContent({ item, onClick }: { item: DisplayRecipe, onClick }) {
    return <CardContent onClick={onClick} className='card-content recipe-card-content'>
        <div className='card-title'>{item.title}</div>
        <div className='card-detail'>
            <IngredientsDisplay items={item.ingredients} />
            <InstructionsDisplay items={item.instructions} />
            <CategoriesDisplay items={item.categories} />
        </div>
    </CardContent>
}

function CategoriesDisplay({ items = [] }: { items?: Category[] }) {
    return <div className="card-section">
        <ul>
            {items.filter(x => x).map((c) => <li key={`${c.id}_${c.name}`} className="pill">{c.name}</li>)}
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