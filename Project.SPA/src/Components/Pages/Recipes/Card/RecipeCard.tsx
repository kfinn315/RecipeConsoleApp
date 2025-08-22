import { Button, Card, CardActions } from "@mui/material"
import type { DisplayRecipe } from "../../../../Types"
import { RecipeCardContent } from "./RecipeCardContent"

interface RecipeCardProps {
    item: DisplayRecipe;
    onEdit: () => void;
    onClick: () => void;
}

export function RecipeCard({ item, onEdit, onClick }: RecipeCardProps) {
    return <Card className={`card recipe-card`} variant='elevation'>
        <RecipeCardContent item={item} onClick={onClick} />
        <CardActions className="card-actions" >
            <Button variant='outlined' onClick={onEdit}>Edit Recipe</Button>
        </CardActions>
    </Card >
}
