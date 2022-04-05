async function getRecipes() {
    const response = await (await fetch("../../data/recipes.json")).json();
    const recipes = response.recipes;
    return ({ recipes: [...recipes]});
}; 



async function init() {
    const { recipes } = await getRecipes();
    const { ingredients, appliances, ustensils } = await createArrays();
    createRecipeCard(recipes);

    attributeItems(ingredients, ustensils, appliances);

    mainInputFiltering(recipes)
/*     filterCategories(ingredients, ustensils, appliances) */
    openList()
};

init();