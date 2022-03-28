const recipeSection = document.querySelector(".recipe-section");
const ingList = document.querySelector(".ing-list");
const appList = document.querySelector(".app-list")

async function getRecipes() {
    const response = await (await fetch("../../data/recipes.json")).json();
    const recipes = response.recipes;
    return ({ recipes: [...recipes]});
};

function createRecipeCard(recipes) {
    recipes.forEach((recipe) => {
        recipeSection.appendChild(new Recipe(recipe).createCard()); 
    });
};

async function init() {
    const { recipes } = await getRecipes();
    createRecipeCard(recipes);
    createArrays(recipes)
    mainInputFiltering(recipes)
};

init();