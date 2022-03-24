const input = document.querySelector(".search-bar");

async function search() {
    const { recipes } = await getRecipes();
    console.log("recipe searchjs", recipes)

    input.addEventListener("input", () => {
        if(input.value.length <3) return
        else {
            //Filtering recipes
            const results = recipes.filter((recipe) => {
               //console.log(recipe.ingredients)
               for(let ingredient in recipe.ingredients) {
                   //console.log(ingredient)
               }
                
//ajout de la recherche dans les ingrédients + nécessité de ne aps être sensible aux majuscules / minuscules
                
                return recipe.name.includes(input.value) || recipe.description.includes(input.value)
            })
            console.log(results)
            //Display left recipes
        }
    })

}
search()