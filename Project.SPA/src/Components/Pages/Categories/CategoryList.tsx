import type React from 'react';
import type { Category } from '../../../Types/Category';
import { CategoryItem } from './CategoryItem';

export function CategoryList({ categories = [], onClick }: { categories: Category[]; onClick: (item: Category) => void | undefined; }) {
    return <div>
        {categories?.map(x => (<CategoryItem key={x.Id} item={x} onClick={onClick} />))}
    </div>;
}
