const recipeSection = document.querySelector(".recipe-section");

async function getRecipes() {
    const response = await (await fetch("../../data/recipes.json")).json();
    const recipes = response.recipes;
    return ({ recipes: [...recipes]});
};

function createRecipeCard(recipes) {
    recipes.forEach((recipe) => {
        const card = new Recipe(recipe).createCard()
        recipeSection.appendChild(card); 
    });
};

async function init() {
    const { recipes } = await getRecipes();
    createRecipeCard(recipes);
};

init();