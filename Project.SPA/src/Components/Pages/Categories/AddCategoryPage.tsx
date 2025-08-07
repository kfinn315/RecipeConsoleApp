import type React from 'react';
import { CategoryForm } from './CategoryForm';
import type { Category } from '../../../Types/Category';
import { useCategories } from '../../Hooks/useCategories';

export function AddCategoryPage() {
    const { addCategory } = useCategories();
    function handleSubmit(item: Category) {
        addCategory(item);
    }

    return <div>
        <h3>Add Category</h3>
        <CategoryForm onSubmit={handleSubmit} />
    </div>;
}
