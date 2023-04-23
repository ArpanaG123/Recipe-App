import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Recipe from "./pages/Recipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRecipe from './pages/CreateRecipe.jsx'
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/recipe" element = {<Recipe /> } />
        <Route path = "/recipe-details/:id" element = {<RecipeDetails /> } />
        <Route path = "/create-recipe" element = {<CreateRecipe /> } />
        <Route path = "/" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
      </Routes>
    </>
  );
}

export default App;
