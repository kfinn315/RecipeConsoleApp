import './App.css'
import Menu, { type MenuOption } from './Components/Menu'
import { useState } from 'react';
import { RecipesPage } from './Components/Pages/Recipes/RecipesPage';
import { Button, ThemeProvider } from '@mui/material';
import { theme } from './Themes/Theme';
import { CategoriesPage } from './Components/Pages/Categories/CategoriesPage';

function App() {

  const options: MenuOption[] = [
    { name: "Recipes Table", page: <RecipesPage /> },
    { name: "Recipes List", page: <RecipesPage variant="list" /> },
    { name: "Recipes Cards", page: <RecipesPage variant="cards" /> },
    { name: "Categories", page: <CategoriesPage /> },
  ]

  const [content, setContent] = useState<MenuOption>(options[0]);

  function menuClickHandler(option: MenuOption) {
    setContent(option);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={"container"}>
        <div className='heading'>
          <h1>
            Recipe App
          </h1>
          <Button variant='contained'>+ Add Recipe</Button>
        </div>
        <div className='menu'>
          <Menu onClick={menuClickHandler} options={options} selected={content.name} />
        </div>
        <div className='content'>
          <main>
            {content.page}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
