import './App.css'
import { Menu, ErrorBanner } from './Components/Shared'
import { useState } from 'react';
import { Button, ThemeProvider } from '@mui/material';
import { theme } from './Theme';
import { CategoriesPage } from './Components/Pages/Categories';
import { RecipesPage, RecipeFormDialog } from './Components/Pages/Recipes';
import { useCategories, useRecipes } from './Hooks';
import type { RecipeRequest } from './Types';

function App() {

  const options: string[] = ["Recipes", "Categories"]

  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [content, setContent] = useState<string>(options[0]);
  const { processAndSaveRecipe, isLoading: isRecipeLoading, recipes, errorMessage: recipeErrorMessage, clearErrorMessage } = useRecipes();
  const { addCategory, categories, editCategory, isLoading: isCategoryLoading, errorMessage: categoryErrorMessage, clearErrorMessage: clearCategoryErrorMessage } = useCategories();

  function menuClickHandler(option: string) {
    setContent(options.find(x => x == option));
  }

  const handleSubmit = (item: RecipeRequest) => {
    setShowAddDialog(false);
    processAndSaveRecipe(item);
  }

  function handleAddDialogClose() {
    setShowAddDialog(false);
  }

  const currentPage = content == "Recipes" &&
    <RecipesPage onSubmit={handleSubmit} variant="cards" categories={categories} isLoading={isRecipeLoading} recipes={recipes} />
    ||
    <CategoriesPage addCategory={addCategory} categories={categories} editCategory={editCategory} isLoading={isCategoryLoading} />

  return (
    <ThemeProvider theme={theme}>
      <div className={"container"}>
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
          <ErrorBanner message={recipeErrorMessage} onClose={() => { clearErrorMessage() }} />
          <ErrorBanner message={categoryErrorMessage} onClose={() => { clearCategoryErrorMessage() }} />
          {currentPage}
        </main>
        <RecipeFormDialog show={showAddDialog} onClose={handleAddDialogClose} onSubmit={handleSubmit} categories={categories} item={undefined} />
      </div>
    </ThemeProvider>
  )
}

export default App
