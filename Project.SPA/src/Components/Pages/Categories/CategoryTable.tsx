import type React from 'react';
import type { Category } from '../../../Types/Category';
import { CategoryItem } from './CategoryItem';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export function CategoryTable({ categories = [], onClick }: { categories: Category[]; onClick: (item: Category) => void | undefined; }) {
    return <div>
        {/* <h3>Categories</h3> */}
        <div class="list">
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
                        {categories?.map(x => (<CategoryItem key={x.id} item={x} onClick={onClick} />))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
}
