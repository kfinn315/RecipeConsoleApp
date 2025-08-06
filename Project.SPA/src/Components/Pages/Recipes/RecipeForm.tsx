import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';

export function RecipeForm({ recipe, onSubmit }: { recipe: Recipe | undefined; onSubmit: (item: Recipe) => void; }) {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        console.log('submit recipe', event.target);
        onSubmit({});
    }
    return <form onSubmit={handleSubmit}>
        <h3>Edit Recipe Form</h3>
        <input type={'hidden'} name={'Id'} value={recipe?.Id} />
        <input type={'text'} name={'Name'} value={recipe?.Name} />
        <button type='submit' >Submit</button>
    </form>;
}
