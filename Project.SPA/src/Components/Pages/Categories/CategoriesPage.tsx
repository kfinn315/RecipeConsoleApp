import type React from 'react';
import { useCategories } from '../../Hooks/useCategories';
import { CategoryTable } from './CategoryTable';
import { Button } from '@mui/material';



export function CategoriesPage() {
    const { isLoading, categories } = useCategories();
    return <div>
        <h2>Categories</h2>
        <div>
            <Button onClick={() => { console.log("Add clicked") }}>Add</Button>
        </div>
        <div>{
            isLoading ? "Loading!" :
                <CategoryTable categories={categories} />
        }
        </div>
    </div>;
}
