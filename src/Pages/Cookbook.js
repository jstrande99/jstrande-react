import React, { useState } from 'react';
import './Style/Cookbook.css'

const recipes = [
  { name: 'French Bread', ingredients: ["Yeast 2 tbsp", 'Sugar 3 tbsp', 'Flour 5 cups', 'Warm Water 2.5 cups', 'Salt 1 Tbsp']},
  { name: 'Pizza', ingredients: ['dough', 'tomato sauce', 'cheese', 'toppings', '']},
  { name: 'Salad', ingredients: ['lettuce', 'tomatoes', 'cucumbers', 'dressing', '']},
  { name: 'French Bread', ingredients: ["Yeast 2 tbsp", 'Sugar 3 tbsp', 'Flour 5 cups', 'Warm Water 2.5 cups', '']},
  { name: 'Pizza', ingredients: ['dough', 'tomato sauce', 'cheese', 'toppings', '']},
  { name: 'Salad', ingredients: ['lettuce', 'tomatoes', 'cucumbers', 'dressing', '']},
];

export function Cookbook() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className='container'>
      <input type="text" placeholder="Lookup a recipe" onChange={handleSearch} className="search" />
      <ul className='recipeUl'>
        {filteredRecipes.map((recipe, index) => (
          <li className='recipeContainer' key={index}>
            <h2>{recipe.name}</h2>
            <p><u>Ingredients:</u></p> {recipe.ingredients.map((ingredient,index) => <p key={index}>{ingredient}<br/></p>)}
          </li>
        ))}
      </ul>
    </div>
  );
}
