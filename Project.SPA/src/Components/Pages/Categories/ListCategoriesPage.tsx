import type React from 'react';
import { useCategories } from '../../Hooks/useCategories';
import { CategoryList } from './CategoryList';



export function ListCategoriesPage() {
    const { isLoading, categories } = useCategories();
    return <div>
        <h2>List Categories</h2>
        <div>{
            isLoading ? "Loading!" :
                <CategoryList categories={categories} />
        }
        </div>
    </div>;
}
