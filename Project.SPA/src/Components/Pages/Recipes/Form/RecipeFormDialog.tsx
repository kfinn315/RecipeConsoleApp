import { FormDialog } from '../../../Shared/FormDialog';
import { RecipeForm } from './RecipeForm';
import type { Recipe, Category, DisplayRecipe, OptionalID } from '../../../../Types';

export interface RecipeFormWrapperProps {
    categories: Category[];
    show: boolean;
    item?: DisplayRecipe;
    onSubmit: (item: OptionalID<Recipe>, categories?: string[]) => void;
    onClose?: () => void;
}

export const RecipeFormDialog = ({ show, item, categories, onSubmit, onClose }: RecipeFormWrapperProps) => {
    const formId = 'recipe-form';
    return <FormDialog className='recipe-dialog recipe-dialog-form' open={show} title={item === undefined ? "Recipe" : "Edit Recipe"} onClose={() => { onClose?.(); }} formId={formId}>
        <RecipeForm onSubmit={onSubmit} recipe={item} formId={formId} categories={categories} />
    </FormDialog>;
};
