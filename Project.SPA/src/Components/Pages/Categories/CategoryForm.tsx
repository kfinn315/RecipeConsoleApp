import type React from 'react';
import type { Category } from '../../Types/Category';
import { useState } from 'react';

export function CategoryForm({ category, onSubmit }: { category: Category | undefined; onSubmit: (item: Category) => void }) {
    const [formCategory, setCategory] = useState<Category | undefined>(category);
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit(formCategory);
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label for="name">Name</label>
            <input type={'text'} name={'name'} value={category?.name} onChange={(event) => setCategory({ ...formCategory, name: event.target.value })} />
        </div>
        <input type={'hidden'} name={'Id'} value={category?.id} />
        <button type='submit' >Submit</button>
    </form>;
}
