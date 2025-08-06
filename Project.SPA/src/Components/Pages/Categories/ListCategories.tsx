import type React from 'react';
import { useCategories } from '../../Hooks/useCategories';
import { CategoryList } from './CategoryList';



export function ListCategories() {
    const { categories } = useCategories();
    return <div>
        <h3>List Categories</h3>
        <div>
            <CategoryList categories={categories} />
        </div>
    </div>;
}
