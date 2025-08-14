import { Button, Card, CardActions, CardContent } from "@mui/material";
import { RecipeForm } from "./RecipeForm";
import type { RecipeFormWrapperProps } from "./RecipeFormWrapperProps";

export const RecipeFormCard = ({ show, categories = [], onClose, onSubmit, item }: RecipeFormWrapperProps) => {
    return <Card className={`recipe-form-card ${show ? "" : "hidden"}`} variant="outlined">
        <CardContent>
            <div>
                <h3>{item===undefined ? "New" : "Update"} Recipe</h3>
                <RecipeForm formId='recipe-form' categories={categories} recipe={item} onSubmit={onSubmit} />
                <CardActions>
                    <Button type='submit' form='recipe-form'>Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </CardActions>
            </div>
        </CardContent>
    </Card>;
}
