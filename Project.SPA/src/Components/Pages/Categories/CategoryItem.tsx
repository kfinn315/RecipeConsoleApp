import type React from 'react';
import type { Category } from '../../../Types/Category';


export function CategoryItem({ item, onClick }: { item: Category; onClick: (item: Category) => void | undefined; }) {
    function handleClick() {
        onClick(item);
    }
    return <a onClick={handleClick} href="#">{item.Id} - {item.Name}</a>;
}
