import type React from 'react';
import type { Category } from '../../Types/Category';

export function CategoryForm({ category, onSubmit }: { category: Category | undefined; onSubmit: (item: Category) => void }) {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        console.log('submit category', event.target);
        onSubmit({});
    }
    return <form onSubmit={handleSubmit}>
        <h3>Edit Category Form</h3>
        <input type={'hidden'} name={'Id'} value={category?.Id} />
        <input type={'text'} name={'Name'} value={category?.Name} />
        <button type='submit' >Submit</button>
    </form>;
}
