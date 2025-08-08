import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { FormDialog } from '../FormDialog';
import { RecipeForm } from './RecipeForm';

export const RecipeFormDialog = ({ open, isAdd, item, onSubmit, onClose }: { onClose; open: boolean; isAdd: boolean; item: Recipe | undefined; onSubmit: (item: Recipe) => void; }) => {
    const formId = 'recipe-form';
    return <FormDialog open={open} title={isAdd ? "Add Recipe" : "Edit Recipe"} onClose={() => { onClose(); }} formId={formId}>
        <RecipeForm onSubmit={onSubmit} recipe={item} formId={formId} />
    </FormDialog>;
};
