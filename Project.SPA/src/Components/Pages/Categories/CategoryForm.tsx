import type React from 'react';
import { useState } from 'react';
import type { Category, OptionalID } from '../../../Types';

export function CategoryForm({ category, onSubmit }: { category?: Category; onSubmit: (item: OptionalID<Category>) => void }) {
    const [formCategory, setCategory] = useState<OptionalID<Category> | undefined>(category);
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (formCategory !== undefined)
            onSubmit(formCategory);
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name</label>
            <input type={'text'} name={'name'} value={category?.name} onChange={(event) => setCategory({ ...formCategory, name: event.target.value })} />
        </div>
        <input type={'hidden'} name={'Id'} value={category?.id} />
        <button type='submit' >Submit</button>
    </form>;
}
