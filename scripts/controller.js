const filterBtn = document.querySelectorAll(".btn");
const input = document.querySelector(".search-bar");

function openList() {
  filterBtn.forEach((button, index) => {
    button.addEventListener("click", () => {
        button.nextElementSibling.style.display = "block"
        button.style.display = "none"
    })
  })
}

async function createArrays(recipes) {
  const ingredients = [];
  const appliances = [];
  const ustensils = [];
  console.log(recipes)
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
  return ({ ingredients: ingredients, appliances: appliances, ustensils: ustensils})
}

function mainInputFiltering(recipes) {
  input.addEventListener("input", () => {
    if(input.value.length < 3) {
      recipeSection.innerHTML = "";
      createRecipeCard(recipes)
      return recipes
    }
    else {
      //Filtering recipes
      const results = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(input.value.toLowerCase()) || recipe.description.toLowerCase().includes(input.value.toLowerCase())
      })
      recipeSection.innerHTML = "";
      createRecipeCard(results)
      console.log(results)
    }
  })
} 

openList()