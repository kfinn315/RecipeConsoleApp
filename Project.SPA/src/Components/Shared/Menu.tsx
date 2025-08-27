import type { JSX } from '@emotion/react/jsx-runtime';
import { Button } from '@mui/material';

export interface MenuOption {
    name: string;
    page: JSX.Element;

}
export function Menu({ selected, options, onClick }: { selected?: string, options: string[], onClick: (option: string) => void }) {
    const isHighlighted = (option: string) => selected && option == selected;
    return <ul className='menu-items'>
        {options.map((option, ix) => (
            <li key={ix} className={`menu-item ${isHighlighted(option) ? "menu-item-highlight" : ""}`}>
                <Button className="menu-button" variant='outlined' onClick={() => { onClick(option) }}><div className='icon'></div>{option}</Button>
            </li>
        )
        )}
    </ul>
}