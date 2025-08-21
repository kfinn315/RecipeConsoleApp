
export interface Recipe {
    id: number;
    title: string;
    categories: number[];
    ingredients: string[];
    instructions: string;

}

export interface RecipeRequest {
    id: number;
    title: string;
    categories: (string | number)[];
    ingredients: string[];
    instructions: string;

}