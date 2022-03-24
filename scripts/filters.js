const filterBtn = document.querySelectorAll(".btn");

filterBtn.forEach((button, index) => {
    button.addEventListener("click", () => {
        button.nextElementSibling.style.display = "block"
        button.style.display = "none"

    })
/*     .then(() => {
        document.addEventListener("click", () => {
            console.log("doc");
            button.style.display = "flex";
            button.nextElementSibling.style.display = "none"
        })
    }) */
})

async function getFilters() {
    const { recipes } = await getRecipes()
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
/*     recipes.forEach((recipe) => {
        appliance.push(recipe.appliance)
    })
    appliance.sort()
    console.log("sorted", appliance)
    appliance.filter((app, index) => {
        return app[index] !== app[index-1]
    })
    console.log("filtered", appliance.filter((app, index) => {
        return app[index] != app[index-1]
    })) */
    //appliance.sort()
    //console.log("sorted", appliance)

    
    console.log("ingredients", ingredients)
    console.log("appliances", appliances)
    console.log("ustensils", ustensils)
}
getFilters()