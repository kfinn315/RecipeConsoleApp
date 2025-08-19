import type React from 'react';
import type { Category } from '../../../Types/Category';
import { CategoryRow } from './CategoryRow';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export function CategoryTable({ categories = [], onClick }: { categories: Category[]; onClick: (item: Category) => void | undefined; }) {
    return <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            ID
                        </TableCell>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories?.map(x => (<CategoryRow key={x.id} item={x} onClick={onClick} />))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
