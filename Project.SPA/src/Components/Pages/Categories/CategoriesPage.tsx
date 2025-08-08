import type React from 'react';
import { useCategories } from '../../Hooks/useCategories';
import { CategoryTable } from './CategoryTable';
import { Button } from '@mui/material';
import { useState } from 'react';
import type { Category } from '../../../Types/Category';
import { CategoryForm } from './CategoryForm';
import { ErrorBanner } from '../../ErrorBanner';



export function CategoriesPage() {
    const { isLoading, categories, addCategory, editCategory } = useCategories();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<Recipe | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>(undefined);

    const handleClick: (item: Category) => void = (item) => {
        setSelected(item);
        setShowModal(true);
    }

    const handleSubmit = (item: Category) => {
        setShowModal(false);
        setTimeout(() => {
            if (item?.id)
                editCategory(item).catch((reason) => { setErrorMessage(reason.message); });
            else
                addCategory(item).catch((reason) => { setErrorMessage(reason.message); });
        }, 1000);

    }
    function handleAddClick() {
        setSelected(undefined);
        setShowModal(true);
    }

    return <div>
        <h2>Categories</h2>
        <div>
            <Button onClick={handleAddClick}>Add</Button>
        </div>
        <ErrorBanner message={errorMessage} />
        <div>{
            isLoading ? "Loading!" :
                <CategoryTable categories={categories} onClick={handleClick} />
        }
        </div>
        {showModal && <CategoryForm category={selected} onSubmit={handleSubmit} />}
    </div>;
}
