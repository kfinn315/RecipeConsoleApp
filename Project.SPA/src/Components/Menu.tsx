import React from 'react';
import type { JSX } from '@emotion/react/jsx-runtime';
import { Button } from '@mui/material';

export interface MenuOption {
    name: string;
    page: JSX.Element;

}
export default function Menu({ selected, options, onClick }: { selected: string | undefined, options: MenuOption[], onClick: (option: MenuOption) => void }) {
    return <ul className='menu-items'>
        {options.map((option, ix) => (
            <li key={ix} className={`menu-item ${selected !== undefined && option.name == selected ? "menu-item-highlight" : ""}`}>
                <Button className="menu-button" variant='outlined' onClick={() => { onClick(option) }}><div className='icon'></div>{option.name}</Button>
            </li>
        )
        )}
    </ul>
}