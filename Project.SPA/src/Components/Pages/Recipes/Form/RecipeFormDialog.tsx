import type React from 'react';
import { FormDialog } from '../../../Shared/FormDialog';
import { RecipeForm } from './RecipeForm';
import type { RecipeRequest } from '../../../../Types';

export interface RecipeFormWrapperProps {
    categories: Category[];
    show: boolean;
    item?: Recipe;
    onSubmit: (item: RecipeRequest) => void;
    onClose?: () => void;
}

export const RecipeFormDialog = ({ show, item, categories, onSubmit, onClose }: RecipeFormWrapperProps) => {
    const formId = 'recipe-form';
    return <FormDialog className='recipe-dialog recipe-dialog-form' open={show} title={item === undefined ? "Add Recipe" : "Edit Recipe"} onClose={() => { onClose(); }} formId={formId}>
        <RecipeForm onSubmit={onSubmit} recipe={item} formId={formId} categories={categories} />
    </FormDialog>;
};
