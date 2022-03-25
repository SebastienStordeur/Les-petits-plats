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
        const card = new Recipe(recipe).createCard()
        recipeSection.appendChild(card); 
    });
};

    async function getFilters(recipes) {
        const ingredients = [];
        const appliances = [];
        const ustensils = [];
        //console.log(recipes)
        for(let i=0; i<recipes.length; i++) {
            if(!appliances.includes(recipes[i].appliance)) {
                appliances.push(recipes[i].appliance)
            }
            recipes[i].ustensils.forEach((ustensil) => {
                if(!ustensils.includes(ustensil)) ustensils.push(ustensil)
            })
            recipes[i].ingredients.forEach((ingredient) => {
                if(!ingredients.includes(ingredient.ingredient)) ingredients.push(ingredient.ingredient)
            })
        }
        console.log("ingredients", ingredients)
        console.log("appliances", appliances)
        console.log("ustensils", ustensils)

        appList.appendChild(new Tag(appliances).createIngredient())
    }
    


async function init() {
    const { recipes } = await getRecipes();
    createRecipeCard(recipes);
    getFilters(recipes)
};

init();