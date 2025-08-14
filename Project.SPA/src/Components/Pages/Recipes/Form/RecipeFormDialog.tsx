import type React from 'react';
import { FormDialog } from '../../FormDialog';
import { RecipeForm } from './RecipeForm';
import type { RecipeFormWrapperProps } from './RecipeFormWrapperProps';

export const RecipeFormDialog = ({ show, item, categories, onSubmit, onClose }: RecipeFormWrapperProps) => {
    const formId = 'recipe-form';
    return <FormDialog open={show} title={item === undefined ? "Add Recipe" : "Edit Recipe"} onClose={() => { onClose(); }} formId={formId}>
        <RecipeForm onSubmit={onSubmit} recipe={item} formId={formId} categories={categories} />
    </FormDialog>;
};
