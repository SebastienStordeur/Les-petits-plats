async function getRecipes() {
    const response = await (await fetch("../../data/recipes.json")).json()
    const recipes = response.recipes
    return ({ recipes: [...recipes]})
}

async function displayData(recipes) {
    const recipeSection = document.querySelector(".recipe-section");
    recipes.forEach((recipe) =>{
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipeSection.appendChild(recipeCardDOM);
    });
};

async function init() {
    const { recipes } = await getRecipes();
    displayData(recipes);
};

function recipeFactory(data) {
    const {id, name, ingredients, time, description } = data
    console.log(data)
    function getRecipeCardDOM() {
        const article = document.createElement("article");
        const div = document.createElement("div");
        const infos = document.createElement("div");
        const titleDiv = document.createElement("div");
        const title = document.createElement("h2");
        const duration = document.createElement("span");
        const recipe = document.createElement("div");
        const ingredientsDiv = document.createElement("div");
        const instructions = document.createElement("p");

        article.classList.add("recipe");
        div.classList.add("photo-recipe");
        infos.classList.add("infos-recipe");
        titleDiv.classList.add("title-div")
        title.classList.add("name-recipe");
        duration.classList.add("duration");
        recipe.classList.add("more-infos");
        ingredientsDiv.classList.add("ingredients");
        instructions.classList.add("instructions");

        article.appendChild(div);
        article.appendChild(infos);
        infos.appendChild(titleDiv);
        titleDiv.appendChild(title)
        titleDiv.appendChild(duration)
        infos.appendChild(recipe);
        recipe.appendChild(ingredientsDiv);
        recipe.appendChild(instructions);

        ingredients.forEach((ingredient) => {
            const singleIngredient = document.createElement("p");
            const spanIngredient = document.createElement("span");
            ingredientsDiv.appendChild(singleIngredient);
            if(!ingredient.quantity && !ingredient.unit) singleIngredient.innerHTML = `<span class="ingredient-name">${ingredient.ingredient}</span>`
            else if(!ingredient.unit) singleIngredient.innerHTML = `<span class="ingredient-name">${ingredient.ingredient}:</span>` + " " + ingredient.quantity
            else singleIngredient.innerHTML = `<span class="ingredient-name">${ingredient.ingredient}:</span>` + " " + ingredient.quantity + " " + ingredient.unit + ""
        })

        title.textContent = name;
        duration.innerHTML = '<i class="fa-solid fa-clock"></i>' + time + " min"
        instructions.textContent = description;
        return article;
    };
    return { data, getRecipeCardDOM }
};

init();