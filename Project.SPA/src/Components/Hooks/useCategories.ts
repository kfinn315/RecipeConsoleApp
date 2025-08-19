import { useEffect, useState } from "react";
import type { Category } from "../../Types/Category";
import { Client } from "../../Client/Client";
import { baseUrl } from "../../Settings";

interface UseCategories {
    isLoading: boolean;
    categories: Category[];
    addCategory: (item: Category) => Promise<void>;
    editCategory: (item: Category) => Promise<void>;
    errorMessage?: string;
    dismissErrorMessage: () => void;
}

export function useCategories(client = new Client(baseUrl)): UseCategories {
    const [categories, setCategories] = useState<Category[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    function addCategory(item: Category): Promise<void> {
        setIsLoading(true);
        return client
            .addCategory(item)
            .then(c => setCategories([...categories, c]))
            .catch((reason: Error) => { setErrorMessage(reason.message); })
            .finally(() => { setIsLoading(false) });
    }

    function editCategory(item: Category): Promise<void> {
        setIsLoading(true);
        return client
            .updateCategory(item)
            .then(c => setCategories([...categories?.filter(x => x.id !== c.id) ?? [], c]))
            .catch((reason: Error) => { setErrorMessage(reason.message); })
            .finally(() => { setIsLoading(false) });
    }

    useEffect(() => {
        setIsLoading(true);
        client.getCategories()
            .then(items => {
                setCategories(items);
            })
            .catch((reason: Error) => { setErrorMessage(reason.message); })
            .finally(() => { setIsLoading(false) });
    }, []);

    function dismissErrorMessage() {
        setErrorMessage(undefined);
    }

    return { isLoading, categories, addCategory, editCategory, dismissErrorMessage, errorMessage };
}