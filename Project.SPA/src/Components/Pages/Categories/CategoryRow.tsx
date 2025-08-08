import type React from 'react';
import type { Category } from '../../../Types/Category';
import { TableCell, TableRow } from '@mui/material';

export function CategoryRow({ item, onClick }: { item: Category; onClick: (item: Category) => void | undefined; }) {
    function handleClick() {
        onClick(item);
    }
    return <TableRow>
        <TableCell>
            {item.id}
        </TableCell>
        <TableCell>
            {item.name}
        </TableCell>
        <TableCell>
            {onClick &&
                <a onClick={handleClick} href="#">Edit</a>
            }
        </TableCell>
    </TableRow>
}
