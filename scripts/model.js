class Model {
    constructor(recipes) {
        this.id = recipes.id;
        this.name = recipes.name;
        this.description = recipes.description;
        this.time = recipes.time;
        this.ingredients = recipes.ingredients;
        this.ustensils = recipes.ustensils;
        //this.recipes = await (await fetch("../data/recipes.json")).json().recipes
    }

/*     getRecipes() {
        const response = await (await fetch("../../data/recipes.json")).json();
        const recipes = response.recipes;
        return ({ recipes: [...recipes]});
    } */

}

/* class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.time = data.time;
        this.ingredients = data.ingredients;
        this.ustensils = data.ustensils;
    };
    //To view
    //this.view.createCard()
}

class Tag {
    constructor(ingredients, appliances, ustensils) {
        this.ingredients = ingredients;
        this.appliances = appliances;
        this.ustensils = ustensils;
    }

//=> VIEW
    createIngTag() {
        const span = document.createElement("span");
        ingList.appendChild(span)
        span.textContent = this.ingredients.ingredient
    }

    createAppTag() {
        const span = document.createElement("span");
        appList.appendChild(span)
        span.textContent = this.appliances.appliances;
    }

    createUstTag() {
        const span = document.createElement("span");
        ustList.appendChild(span);
        span.textContent = this.ustensils.ustensils
    }
} */