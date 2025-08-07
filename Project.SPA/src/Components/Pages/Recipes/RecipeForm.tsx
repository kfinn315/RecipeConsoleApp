import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { useState } from 'react';

export function RecipeForm({ recipe, onSubmit }: { recipe: Recipe | undefined; onSubmit: (item: Recipe) => void; }) {
    const [formRecipe, setRecipe] = useState<Recipe | undefined>(recipe);
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit(formRecipe);
    }
    return <form onSubmit={handleSubmit}>
        <input type={'hidden'} name={'id'} value={recipe?.id} />
        <div>
            <label for="title">Title</label>
            <input type='text' name='title' value={recipe?.title} onChange={(ev) => { setRecipe({ ...formRecipe, title: ev.target.value }) }} />
        </div>
        <div>
            <label for="categories">Categories</label>
            <input type={'text'} name={'categories'} value={recipe?.categories} onChange={(ev) => { setRecipe({ ...formRecipe, categories: ev.target.value }) }} />
        </div>
        <div>
            <label for="ingredients">Ingredients</label>
            <input type={'text'} name={'ingredients'} value={recipe?.ingredients} onChange={(ev) => { setRecipe({ ...formRecipe, ingredients: ev.target.value }) }} />
        </div>
        <div>
            <label for="instructions">Instructions</label>
            <input type={'text'} name={'instructions'} value={recipe?.instructions} onChange={(ev) => { setRecipe({ ...formRecipe, instructions: ev.target.value }) }} />
        </div>
        <button type='submit' >Submit</button>
    </form>;
}
