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

/*function createRecipeCard(recipes) {
    recipes.forEach((recipe) => {
        recipeSection.appendChild(new Recipe(recipe).createCard()); 
    });
};

async function init() {
    const { recipes } = await getRecipes();
    const { ingredients, appliances, ustensils } = await createArrays();
    createRecipeCard(recipes);
    createArrays()
    attributeItems(ingredients, ustensils, appliances)

    mainInputFiltering(recipes)
    filterCategories(ingredients, ustensils, appliances)
};

init(); */
async function init() {
    const { recipes } = await getRecipes();
    const app = new Controller(new Model(recipes), new View().displayAll(recipes));

    console.log(recipes)


}

init()