import type React from 'react';
import type { Category } from '../../../Types/Category';


export function CategoryItem({ item, onClick }: { item: Category; onClick: (item: Category) => void | undefined; }) {
    function handleClick() {
        onClick(item);
    }
    function toString(item: Category) {
        return `${item.id} - ${item.name}`
    }
    return <li className='list-item'>
        <a onClick={handleClick} href="#">{toString(item)}</a>
    </li>
}
