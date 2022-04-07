async function getRecipes() {
    const response = await (await fetch("../../data/recipes.json")).json();
    const recipes = response.recipes;
    return ({ recipes: [...recipes] });
};



async function init() {
    const { recipes } = await getRecipes();
    const { ingredients, appliances, ustensils } = createArrays(recipes);


    createRecipeCard(recipes); //recipes 
    createArrays(recipes); //tableaux de base
    attributeItems(ingredients, ustensils, appliances); //attribution basique

    
    mainInputFiltering(recipes); //recipes ou liste de recette maj
    advancedInputFiltering(ingredients, appliances, ustensils); //ou listes maj
    openList();
    //closelist
    createTag()

    //search()
};

init();