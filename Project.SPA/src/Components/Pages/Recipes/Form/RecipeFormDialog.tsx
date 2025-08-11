import type React from 'react';
import type { Recipe, Category } from '../../../../Types';
import { FormDialog } from '../../FormDialog';
import { RecipeForm } from './RecipeForm';

export const RecipeFormDialog = ({ open, isAdd, item, categories, onSubmit, onClose }: { categories: Category[], onClose; open: boolean; isAdd: boolean; item: Recipe | undefined; onSubmit: (item: Recipe) => void; }) => {
    const formId = 'recipe-form';
    return <FormDialog open={open} title={isAdd ? "Add Recipe" : "Edit Recipe"} onClose={() => { onClose(); }} formId={formId}>
        <RecipeForm onSubmit={onSubmit} recipe={item} formId={formId} categories={categories} />
    </FormDialog>;
};
