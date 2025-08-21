import { useEffect, useState } from "react";
import type { Category } from "../Types";
import { CategoryClient, type Client } from "../Client";
import { baseUrl } from "../Configuration";

interface UseCategories {
    isLoading: boolean;
    categories: Category[];
    addCategory: (item: Category) => Promise<number>;
    editCategory: (item: Category) => Promise<void>;
    errorMessage?: string;
    clearErrorMessage: () => void;
    processRecipeCategories: (items: (number | string)[]) => number[]
}

export function useCategories(client: Client<Category> = new CategoryClient(baseUrl)): UseCategories {
    const [categories, setCategories] = useState<Category[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    function addCategory(item: Category): Promise<number> {
        setIsLoading(true);
        return client
            .add(item)
            .then(c => { setCategories([...categories, c]); return c.id; })
            .catch((reason: Error) => { setErrorMessage(reason.message); })
            .finally(() => { setIsLoading(false) });
    }

    function editCategory(item: Category): Promise<void> {
        setIsLoading(true);
        return client
            .update(item)
            .then(c => setCategories([...categories?.filter(x => x.id !== c.id) ?? [], c]))
            .catch((reason: Error) => { setErrorMessage(reason.message); })
            .finally(() => { setIsLoading(false) });
    }

    useEffect(() => {
        setIsLoading(true);
        client.get()
            .then(items => {
                setCategories(items);
            })
            .catch((reason: Error) => { setErrorMessage(reason.message); })
            .finally(() => { setIsLoading(false) });
    }, []);

    function clearErrorMessage() {
        setErrorMessage(undefined);
    }

    function processRecipeCategories(items: (number | string)[]): number[] {
        const itemsCopy = [...items]
        const newCategories = itemsCopy.filter(x => typeof x === "string");
        const categories = itemsCopy.filter(x => typeof x === 'number');
        newCategories.forEach(category => {
            addCategory({ name: category }).then((id) => { categories.push(id); });
        });
        return categories;
    }

    return { processRecipeCategories, isLoading, categories, addCategory, editCategory, clearErrorMessage, errorMessage };
}