import type { Category } from "./Category";

export interface Recipe {
    id?: number;
    title: string;
    categories: Category[];
    ingredients: string[];
    instructions: string;

}

export interface RecipeRequest {
    id?: number;
    title: string;
    categories: {
        ids: number[];
        names: string[];
    }
    ingredients: string[];
    instructions: string;

}