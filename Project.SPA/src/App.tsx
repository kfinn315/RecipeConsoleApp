import './App.css'
import { Menu, ErrorBanner } from './Components/Shared'
import { useState } from 'react';
import { Button, ThemeProvider } from '@mui/material';
import { theme } from './Theme';
import { CategoriesPage } from './Components/Pages/Categories';
import { RecipesPage, RecipeFormDialog } from './Components/Pages/Recipes';
import type { Recipe, OptionalID } from './Types';
import { useDatasource } from './Hooks';

function App() {
  const options: string[] = ["Recipes", "Categories"]

  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [content, setContent] = useState<string>(options[0]);
  const { categories: { categories, addCategory, editCategory }, recipes: { addRecipe, editRecipe, recipes }, clearErrorMessage, isLoading, errorMessage } = useDatasource();

  function menuClickHandler(option: string) {
    setContent(options.find(x => x == option) ?? options[0]);
  }

  const handleAddSubmit = async (item: OptionalID<Recipe>, categoryNames?: string[]) => {
    setShowAddDialog(false);
    await addRecipe(item, categoryNames)
  }

  const handleEditSubmit = async (item: OptionalID<Recipe>, categoryNames?: string[]) => {

    setShowAddDialog(false);
    await editRecipe(item as Recipe, categoryNames)
  }
  function handleAddDialogClose() {
    setShowAddDialog(false);
  }

  const currentPage = content == "Recipes" &&
    <RecipesPage onSubmit={handleEditSubmit} variant="cards" categories={categories} isLoading={isLoading} recipes={recipes} />
    ||
    <CategoriesPage addCategory={addCategory} categories={categories} editCategory={editCategory} isLoading={isLoading} />

  return (
    <ThemeProvider theme={theme}>
      <div className='container'>
        <header className='heading'>
          <h1>
            Recipe App
          </h1>
          <Button className='button button-add-recipe' onClick={() => setShowAddDialog(true)} variant='contained' size='large'>+ Add Recipe</Button>
        </header>
        <nav className='menu'>
          <Menu onClick={menuClickHandler} options={options} selected={content} />
        </nav>
        <main className='content'>
          <ErrorBanner message={errorMessage} onClose={clearErrorMessage} />
          {currentPage}
        </main>
        <RecipeFormDialog show={showAddDialog} onClose={handleAddDialogClose} onSubmit={handleAddSubmit} categories={categories} item={undefined} />
      </div>
    </ThemeProvider>
  )
}

export default App

