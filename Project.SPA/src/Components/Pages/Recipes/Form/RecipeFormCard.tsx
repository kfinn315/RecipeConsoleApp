import { Button, Card, CardActions, CardContent } from "@mui/material";
import { RecipeForm } from "./RecipeForm";

export const RecipeFormCard = ({ categories = [], onClose, onSubmit, recipe }: { onClose, onSubmit, categories, recipe }) => {
    return <Card variant="outlined">
        <CardContent>
            <div>
                <h3>New Recipe</h3>
                <RecipeForm formId='recipe-form' categories={categories} recipe={recipe} onSubmit={onSubmit} />
                <CardActions>
                    <Button type='submit' form='recipe-form'>Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </CardActions>
            </div>
        </CardContent>
    </Card>;
}
