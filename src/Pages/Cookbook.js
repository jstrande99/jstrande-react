import React, { useState } from 'react';
import './Style/Cookbook.css'

const recipes = [
    { 
        name: 'French Bread', 
        ingredients: ["Yeast -2 tbsp", 'Sugar -3 tbsp', 'Flour -5 cups', 'Warm Water -2.5 cups', 'Salt -1 Tbsp', 'Vegetable Oil -1/2 cup', 'Large egg -1'], 
        image: 'https://github.com/jstrande99/jstrande-react/blob/main/src/Pages/images/frenchBread.png?raw=true',
        instructions: ['Combine 1/2 warm water (100-110 degrees), 1 teaspoon sugar and yeast. Allow to foam.', 'In a mixer, combine rest of water, sugar, salt and oil. Add in 2-3 cups of flour and allow to mix thoroughly.', 'Mix in yeast mixture', 'Add remainder of flour, be sure to not add too much flour (dough should be somewhat sticky)', 'Allow dough to rise for 1 hour or until doubled in size', 'Cut dough into 3 parts and roll out to about 1 inch thick. Roll dough onto self and tuck ends under', 'Preheat oven to 375-400 degrees, and allow for dough to rise for another 30-45 minutes', 'Bake for 30 minutes or until top is golden brown, and inside is 180 degrees']
    },
    { 
        name: 'Pasta Noodles', 
        ingredients: ['Flour -2 cups', 'Olive Oil -2 tbsp', 'Salt -1 pinch', 'Eggs -4', 'Egg Yokes -2'], 
        image: 'https://github.com/jstrande99/jstrande-react/blob/main/src/Pages/images/Noodles.png?raw=true',
        instructions: ['Put flour on a cool hard surface, form a bowl shape in the center', 'Crack eggs into center of formed flour bowl', 'Use a fork to beat eggs and slowly incorparate flour into eggs', 'Once dough is firm enough to handle with hands, knead dough for about 10 minutes. Dough should be firm and elastic', 'Roll dough out and cut into shape of your choosing']
    },
    { 
        name: 'Orange Chicken', 
        ingredients: ['Chicken Breast -2 lbs', 'Cornstarh -1/4 cup', 'Vegetable Oil -1 tbsp', 'Minced Garlic -4 tbsp', 'Tomato Sauce -1 cup', 'Water -1/2 cup', 'Sugar -1/4 cup', 'Brown Sugar -2 tbsp', 'Sriracha Sauce -1 tbsp', 'Soy Sauce -1 tbsp', 'Canola Oil -2 tbsp', 'Orange Juice -1 zested/julienned'], 
        image: 'https://github.com/jstrande99/jstrande-react/blob/main/src/Pages/images/chicken.png?raw=true',
        instructions: ['Cut chicken into 1 inch chuncks and coat with cornstarch', 'Add canola oil into Wok with medium heat', 'Once oil is hot add chicken', 'Cook till golden or internal temp is 165 degrees then remove chicken from Wok', 'Add vegetable oil, minced garlic and green onion to Wok. Becareful to not over cook', 'Add tomato sauce, water, sugar, sriracha sauce and soy sauce', 'Bring to boil, then allow to simmer for 5 minutes or until thicked. Top with orange zest', 'Remove Wok from heat and add chicken back in. Reheat for 30-45 seconds.']
    },
    { 
        name: 'Cinnamon Sugar Bagel', 
        ingredients: ['Warm Water -1 1/4 cups', 'Yeast -1 packet', 'Flour -4 cups', 'Sugar -3 tbsp', 'Salt -1 tsp', 'Vegetable Oil -2 tbsp', 'Cinnamon -2 tbsp', 'Egg White -1', 'Water -1 tbsp'], 
        image: 'https://github.com/jstrande99/jstrande-react/blob/main/src/Pages/images/bagel.png?raw=true',
        instructions: ['In a stand mixer add warm water, sugar and yeast. Allow to foam, then add flour, salt, oil, and cinnamon', 'Mix on low until dough comes together', 'Transfer dough to greased bowl, cover and let rise for 2 hours or until doubled in size', 'Place dough on cold surface and divide into 12 equal pieces (3-4 ounces each)', 'Form balls and place on cooking sheet', 'Let rest for 15 minutes. Bring water to a boil (can add honey if wanted) and preheat oven to 425 degrees', 'After rested poke holes in middles and boil dough for 1-2 minutes per side', 'Allow to dry', 'Whisk egg white and water together and brush on top of dough', 'Sprinkle sugar/cinnamon on top', 'Bake in oven for 20 minutes or until golden brown']
    },
];

export function Cookbook() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFood, setSelectedFood] = useState(null);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFoodSelection = (food) => {
        if(selectedFood === food){
            setSelectedFood(null);
        }else{
            setSelectedFood(food);
        }
    }

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='container'>
        <input type="text" placeholder="Lookup a recipe" onChange={handleSearch} className="search" />
        <ul className='recipeUl'>
            {filteredRecipes.map((recipe, index) => (
            <li className='recipeContainer' key={index} onClick={()=> handleFoodSelection(recipe)}>
                <h2>{recipe.name}</h2>
                <img src={recipe.image} alt={recipe.name} width="200" height="150"/>
                {selectedFood === recipe && (
                <>
                <p><u>Ingredients:</u></p> {recipe.ingredients.map((ingredient,index) => <p key={index}>{ingredient}<br/></p>)}
                <div className='horizontalLine'></div>
                {recipe.instructions.map((instruction, index1) => (
                    <p key={index1}><b><u>{index1+1}.</u></b><br/>{instruction}</p>
                ))}
                </>
                )}
            </li>
            ))}
        </ul>
        </div>
    );
}
