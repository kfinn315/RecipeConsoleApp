import type React from 'react';
import type { Recipe, Category } from '../../../../Types';
import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

/**
 * - prop.recipe values are the initial values used in the form
 * - prop.recipe == undefined? Create a new recipe : Edit a recipe
 * - on submit click, the onSubmit parameter is called and passed a Recipe interface w/ all the field values
 */
export function RecipeForm({ recipe, categories: categoryOptions, onSubmit, formId }: { recipe: Recipe | undefined; categories: Category[], onSubmit: (item: Recipe) => void, formId: string }) {
    const [title, setTitle] = useState<string>(recipe?.title);
    const [categories, setCategories] = useState<number[]>(recipe?.categories ?? []);
    const [ingredients, setIngredients] = useState<string[]>(recipe?.ingredients);
    const [instructions, setInstructions] = useState<string>(recipe?.instructions ?? []);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const newRecipe: Recipe = {
            id: recipe?.id,
            title,
            categories,
            ingredients,
            instructions
        };
        console.info(newRecipe);
        onSubmit(newRecipe);
    }

    return <form id={formId} onSubmit={handleSubmit} className="form">
        <TextField className='text-field' label="Title" onChange={(ev) => { setTitle(ev.target.value) }} value={title} />

        <FormControl>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select multiple labelId='categories-label' value={categories} onChange={(event) => { setCategories(event.target.value as number[]) }}>
                {
                    categoryOptions.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)
                }
            </Select>
        </FormControl>
        <TextFieldList label="Ingredients" value={ingredients} onChange={(value) => setIngredients(value)} />
        <FormControl>
            <TextField className='text-field' label="Ingredients" onChange={(ev) => { setIngredients(ev.target.value) }} value={ingredients} />
        </FormControl>
        <TextField className='text-field' label="Instructions" onChange={(ev) => { setInstructions(ev.target.value) }} value={instructions} />
    </form>;
}

function TextFieldList({ label, onChange, value }: { label: string, onChange: (value: string[]) => void, value: string[] }) {
    const [list, setList] = useState<string[]>(value ?? []);
    const [last, setLast] = useState<string>();
    return <FormControl>
        <label>{label}</label>
        {
            list.map(x => <span>{x}</span>)
        }
        <TextField onChange={(ev) => { setLast(ev.target.value) }} value={last} />
        <Button onClick={() => {
            if (last) {
                const newList = [...list, last]; setList(newList); setLast(''); onChange?.(newList);
            }
        }}>Add</Button>
    </FormControl>
}