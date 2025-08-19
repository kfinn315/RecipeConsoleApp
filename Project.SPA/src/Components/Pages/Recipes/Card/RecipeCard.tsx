import { Button, Card, CardActions } from "@mui/material"
import type { Recipe } from "../../../../Types"
import { RecipeCardContent } from "./RecipeCardContent"

export function RecipeCard({ item, onEdit, onClick }: { item: Recipe, onEdit, onClick }) {
    return <Card className={`card recipe-card`} variant='elevation'>
        <RecipeCardContent item={item} onClick={onClick} />
        <CardActions className="card-actions" >
            <Button variant='outlined' onClick={onEdit}>Edit Recipe</Button>
        </CardActions>
    </Card >
}
