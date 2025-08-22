import type React from 'react';
import type { Category, RecipeRequest, DisplayRecipe } from '../../../../Types';
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';

interface RecipeFormProps {
    recipe?: DisplayRecipe;
    categories: Category[];
    onSubmit: (item: RecipeRequest) => Promise<void>;
    formId: string;
}

/**
 * - prop.recipe values are the initial values used in the form
 * - prop.recipe == undefined? Create a new recipe : Edit a recipe
 * - on submit click, the onSubmit parameter is called and passed a Recipe interface w/ all the field values
 */
export function RecipeForm({ recipe, categories: categoryOptions, onSubmit, formId }: RecipeFormProps) {
    const [title, setTitle] = useState<string>(recipe?.title);
    const [categories, setCategories] = useState<number[]>(recipe?.categories?.map(x => x.id) ?? []);
    const [newCategories, setNewCategories] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<string[]>(recipe?.ingredients ?? []);
    const [instructions, setInstructions] = useState<string>(recipe?.instructions ?? "");

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const newRecipe: RecipeRequest = {
            id: recipe?.id,
            title,
            categories: { ids: categories, names: newCategories },
            ingredients,
            instructions
        };
        console.info(newRecipe);
        onSubmit(newRecipe);
    }

    function handleIngredientsChange(ev) {
        //split input on newline characters
        setIngredients((ev.target.value as string).split('\n'));
    }

    return <form id={formId} onSubmit={handleSubmit} className="form recipe-form">
        <TextField required={true} className='text-field' label="Title" onChange={(ev) => { setTitle(ev.target.value) }} value={title} />
        <TextField type='text' className='text-field' label="Ingredients" onChange={handleIngredientsChange} value={ingredients} />
        <TextField className='text-field' label="Instructions" onChange={(ev) => { setInstructions(ev.target.value) }} value={instructions} />
        <label>Categories</label>
        <FormControl>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select multiple labelId='categories-label' value={categories} onChange={(event) => { setCategories(event.target.value as number[]) }}>
                {
                    categoryOptions.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
                }
            </Select>
        </FormControl>
        <FormControl>
            <AddCategoryControl onAdd={(name: string) => { setNewCategories([...newCategories, name]) }} />
            {newCategories.length > 0 && <div>
                Created Categories:&nbsp;{newCategories.join(', ')}
            </div>
            }
        </FormControl>
    </form>;
}
function AddCategoryControl({ onAdd }: { onAdd: (value: string) => void }) {
    const [show, setShow] = useState<boolean>(false);
    const [textField, setTextField] = useState<string>("");

    function newClickHandler() {
        setShow(true);
    }
    function addClickHandler() {
        if (textField.length > 0) {
            onAdd(textField);
            setTextField("");
        }
    }
    return <>
        {!show && <FormControl>
            <Button onClick={newClickHandler}>Create Category</Button>
        </FormControl>}
        {show && <FormControl>
            <TextField required label="Category Name" value={textField} onChange={(ev) => { setTextField(ev.target.value) }} />
            <Button onClick={addClickHandler}>Add</Button>
        </FormControl>
        }
    </>
}
// function TextFieldList({ label, onChange, value }: { label: string, onChange: (value: string[]) => void, value: string[] }) {
//     const [list, setList] = useState<string[]>(value ?? []);
//     const [last, setLast] = useState<string>();
//     return <FormControl>
//         <label>{label}</label>
//         {
//             list.map(x => <span>{x}</span>)
//         }
//         <TextField onChange={(ev) => { setLast(ev.target.value) }} value={last} />
//         <Button onClick={() => {
//             if (last) {
//                 const newList = [...list, last]; setList(newList); setLast(''); onChange?.(newList);
//             }
//         }}>Add</Button>
//     </FormControl>
// }