import './App.css'
import Menu from './Components/Menu'
import { useState } from 'react';
import { RecipesPage } from './Components/Pages/Recipes/RecipesPage';
import { Button, ThemeProvider } from '@mui/material';
import { theme } from './Theme';
import { CategoriesPage } from './Components/Pages/Categories/CategoriesPage';
import { RecipeFormDialog } from './Components/Pages/Recipes/Form/RecipeFormDialog';
import { useRecipes } from './Components/Hooks/useRecipes';
import { useCategories } from './Components/Hooks/useCategories';
import { ErrorBanner } from './Components/ErrorBanner';

function App() {

  const options: string[] = ["Recipes", "Categories"]

  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [content, setContent] = useState<string>(options[0]);
  const { addRecipe, editRecipe, isLoading, recipes, errorMessage, dismissErrorMessage } = useRecipes();
  const { addCategory, categories, editCategory, isLoading: isCategoryLoading } = useCategories();

  function menuClickHandler(option: string) {
    setContent(options.find(x => x == option));
  }

  const handleSubmit = (item: Recipe) => {
    setShowAddDialog(false);
    setTimeout(() => {
      addRecipe(item);
    }, 1000);
  }

  function handleAddDialogClose() {
    setShowAddDialog(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={"container"}>
        <header className='heading'>
          <h1>
            Recipe App
          </h1>
          <Button onClick={() => setShowAddDialog(true)} variant='contained'>+ Add Recipe</Button>
        </header>
        <nav className='menu'>
          <Menu onClick={menuClickHandler} options={options} selected={content} />
        </nav>
        <main className='content'>
          <ErrorBanner message={errorMessage} onClose={() => { dismissErrorMessage() }} />
          {(content == "Recipes" &&
            <RecipesPage variant="cards" addRecipe={addRecipe} editRecipe={editRecipe} categories={categories} isLoading={isLoading} recipes={recipes} />)
            ||
            <CategoriesPage addCategory={addCategory} categories={categories} editCategory={editCategory} isLoading={isCategoryLoading} />}
        </main>
        <RecipeFormDialog show={showAddDialog} onClose={handleAddDialogClose} onSubmit={handleSubmit} categories={categories} item={undefined} />
      </div>
    </ThemeProvider>
  )
}

export default App
