async function getRecipes() {
    const response = await (await fetch("../../data/recipes.json")).json();
    const recipes = response.recipes;
    return ({ recipes: [...recipes] });
};



async function init() {
    const { recipes } = await getRecipes();
    const { ingredients, appliances, ustensils } = createArrays(recipes);
    
    createRecipeCard(recipes); //recipes 
    mainInputFiltering(recipes); //recipes ou liste de recette maj
    advancedInputFiltering(ingredients, appliances, ustensils, recipes); //ou listes maj
    openList();
    //closelist
};

init();