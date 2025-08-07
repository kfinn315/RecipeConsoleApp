import { useEffect, useState } from "react";
import type { Category } from "../../Types/Category";
import { Client } from "../../Client/Client";
import { baseUrl } from "../../Settings";

interface UseCategories {
    isLoading: boolean;
    categories: Category[];
    addCategory: (item: Category) => Promise<void>;
    editCategory: (item: Category) => Promise<void>;
}

export function useCategories(): UseCategories {
    const client = new Client(baseUrl);

    function addCategory(item: Category): Promise<void> {
        return client.addCategory(item);
    }
    function editCategory(item: Category): Promise<void> {
        return client.editCategory(item);
    }
    const [categories, setCategories] = useState<Category[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        client.getCategories().then(items => {
            console.log(items);
            setCategories(items);
        }).catch((reason) => {
            console.error(reason);
        }).finally(() => { setIsLoading(false) });
    }, []);

    return { isLoading, categories, addCategory, editCategory };
}