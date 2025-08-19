import type { Category, Recipe } from '../../../../Types';


export interface RecipeFormWrapperProps {
    categories: Category[];
    show: boolean;
    item: Recipe | undefined;
    onSubmit: (item: Recipe) => void;
    onClose;
}
