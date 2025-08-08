import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { useState } from 'react';
import { TextField } from '@mui/material';

/**
 * - prop.recipe values are the initial values used in the form
 * - prop.recipe == undefined? Create a new recipe : Edit a recipe
 * - on submit click, the onSubmit parameter is called and passed a Recipe interface w/ all the field values
 */
export function RecipeForm({ recipe, onSubmit, formId }: { recipe: Recipe | undefined; onSubmit: (item: Recipe) => void, formId: string }) {
    const [formRecipe, setRecipe] = useState<Recipe | undefined>(recipe);
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit(formRecipe);
    }

    return <form id={formId} onSubmit={handleSubmit} className="form">
        <input type={'hidden'} name={'id'} value={formRecipe?.id} />
        <TextField className='text-field' label="Title" onChange={(ev) => { setRecipe({ ...formRecipe, title: ev.target.value }) }} value={formRecipe?.title} />
        <TextField className='text-field' label="Categories" onChange={(ev) => { setRecipe({ ...formRecipe, categories: ev.target.value }) }} value={formRecipe?.categories} />
        <TextField className='text-field' label="Ingredients" onChange={(ev) => { setRecipe({ ...formRecipe, ingredients: ev.target.value }) }} value={formRecipe?.ingredients} />
        <TextField className='text-field' label="Instructions" onChange={(ev) => { setRecipe({ ...formRecipe, instructions: ev.target.value }) }} value={formRecipe?.instructions} />
    </form>;
}
