const recipeSection = document.querySelector(".recipe-section");
const tagSection = document.querySelector(".tag-section");
const ingList = document.querySelector(".ing-list");
const appList = document.querySelector(".app-list")
const ustList = document.querySelector(".ust-list");

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
    const { ingredients, appliances, ustensils } = await createArrays();
    createRecipeCard(recipes);
    createArrays()
    attributeItems(ingredients, appliances, ustensils)

    mainInputFiltering(recipes)
};

init();