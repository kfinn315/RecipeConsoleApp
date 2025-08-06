import React, { useState } from 'react';
import type { Category } from "../../../Types/Category";
import { CategoryList } from './CategoryList';
import { useCategories } from '../../Hooks/useCategories';
import { CategoryForm } from './CategoryForm';

export function EditCategory() {
    const { categories, editCategory } = useCategories();
    const [selected, setSelected] = useState<Category | undefined>(undefined);

    const handleClick: (item: Category) => void = (item) => {
        setSelected(item);
    }
    function handleSubmit(category: Category) {
        editCategory(category);
    }

    return <div>
        <h2>Edit Category</h2>
        <CategoryList categories={categories} onClick={handleClick} />
        {
            selected && <CategoryForm category={selected} onSubmit={handleSubmit} />
        }
    </div>;
}
