class View {
    constructor() {}

    //create recipe cards
    createCard(recipes) {
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

        this.ingredients.forEach((ingredient) => {
            const singleIngredient = document.createElement("p");
            ingredientsDiv.appendChild(singleIngredient);
            if(!ingredient.quantity && !ingredient.unit) singleIngredient.innerHTML = `<span class="ingredient-name">${ingredient.ingredient}</span>`
            else if(!ingredient.unit) singleIngredient.innerHTML = `<span class="ingredient-name">${ingredient.ingredient}:</span>` + " " + ingredient.quantity
            else singleIngredient.innerHTML = `<span class="ingredient-name">${ingredient.ingredient}:</span>` + " " + ingredient.quantity + " " + ingredient.unit + ""
        })

        title.textContent = this.name;
        duration.innerHTML = '<i class="fa-solid fa-clock"></i>' + this.time + " min"
        instructions.textContent = this.description;
        return article;
    }

}