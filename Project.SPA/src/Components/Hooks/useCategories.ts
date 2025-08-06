import { useEffect, useState } from "react";
import type { Category } from "../../Types/Category";
import { Client } from "../../Client/Client";
import { baseUrl } from "../../Settings";

export function useCategories(): { categories: Category[], addCategory: (item: Category) => Promise<void>, editCategory: (item: Category) => Promise<void> } {
    const client = new Client(baseUrl);


    function addCategory(item: Category): Promise<void> {
        return client.addCategory(item);
    }
    function editCategory(item: Category): Promise<void> {
        return client.editCategory(item);
    }
    const [categories, setCategories] = useState<Category[] | undefined>([]);

    useEffect(() => {
        client.getCategories().then(items => {
            console.log(items);
            setCategories(items);
        }).catch((reason) => {
            console.error(reason);
        });
    }, []);

    return { categories, addCategory, editCategory };
}