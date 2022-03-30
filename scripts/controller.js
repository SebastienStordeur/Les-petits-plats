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

//Create ingredients, appliances and ustensils arrays
/* function createArrays(recipes) {
	const ingredients = [];
	const appliances = [];
	const ustensils = [];
	console.log("recipes",recipes)
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
	console.log("ing", ingredients)
	console.log("ustensils", ustensils)
	console.log("appliance", appliances)
  return ({ ingredients: [...ingredients], appliances: [...appliances], ustensils: [...ustensils] })
} */

async function createArrays() {
	const response = await (await fetch("../../data/recipes.json")).json();
	const recipes = response.recipes;
	const ingredients = [];
	const appliances = [];
	const ustensils = [];
	console.log("recipes",recipes)
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

  return ({ ingredients: [...ingredients], appliances: [...appliances], ustensils: [...ustensils] })
}

function attributeItems(ingredients, ustensils, appliances) {
	//Attributing ingredients to the div (for tag and advance search)
	ingredients.forEach(ingredient => {
		const ingredientSpan = document.createElement("span");
		ingList.appendChild(ingredientSpan);
		ingredientSpan.textContent = ingredient;
	})
	//Attributing ustensils to the div (for tag and advance search)
	ustensils.forEach(ustensil => {
		const ustensilSpan = document.createElement("span");
		ustList.appendChild(ustensilSpan);
		ustensilSpan.textContent = ustensil;
	})
	//Attributing appliances to the div (for tag and advance search)
	appliances.forEach(appliance => {
		const applianceSpan = document.createElement("span");
		appList.appendChild(applianceSpan);
		applianceSpan.textContent = appliance;
	})
}

//Filtering with main input
function mainInputFiltering(recipes) {
	input.addEventListener("input", () => {
		if(input.value.length < 3) {
			recipeSection.innerHTML = "";
			createRecipeCard(recipes)
			return recipes
		} else {
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