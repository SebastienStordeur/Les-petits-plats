class Model {
    constructor() {
        this.recipes = await (await fetch("../data/recipes.json")).json()
        //this.recipes = await (await fetch("../data/recipes.json")).json().recipes
    }
    
    test() {
      console.log(this.recipes)  
    }
    

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