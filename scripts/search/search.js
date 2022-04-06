//Filtering with main input
async function mainInputFiltering(recipes) {
	const { ingredients, ustensils, appliances } = await createArrays()
	input.addEventListener("input", () => {
		if(input.value.length < 3) {
			recipeSection.innerHTML = "";
			createRecipeCard(recipes);
			return recipes;
		} 	else {
			//Filtering recipes
			const filteredRecipes = recipes.filter(recipe => {
				return recipe.name.toLowerCase().includes(input.value.toLowerCase()) || 
				recipe.description.toLowerCase().includes(input.value.toLowerCase()) /* || 
				recipe.ingredients.toLowerCase().includes(input.value.toLowerCase()); */
			});
			console.log("resultats", filteredRecipes)

            const filteredAppliances = appliances.filter(appliance => {
                return filteredRecipes.forEach((results) => {
                    return results.appliance
                })
            }) //not wokring

            console.log(filteredAppliances)
			recipeSection.innerHTML = "";
			createRecipeCard(filteredRecipes);
			return filteredRecipes;
		}
	});
}

//Create ingredients, ustensils and appliances arrays
 async function createArrays() {
	const response = await (await fetch("../../data/recipes.json")).json();
	const recipes = response.recipes;
	const ingredients = [];
	const appliances = [];
	const ustensils = [];
	for(let i=0; i<recipes.length; i++) {
		if(!appliances.includes(recipes[i].appliance)) appliances.push(recipes[i].appliance)
		
		recipes[i].ustensils.forEach((ustensil) => {
			if(!ustensils.includes(ustensil)) ustensils.push(ustensil)
		})

		recipes[i].ingredients.forEach((ingredient) => {
			if(!ingredients.includes(ingredient.ingredient)) ingredients.push(ingredient.ingredient)
		})
	}
  	return ({ ingredients: [...ingredients], appliances: [...appliances], ustensils: [...ustensils] })
}

//fill lists with ingredients ustensils and appliances
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


function advancedInputFiltering(ingredients, appliances, ustensils) {
	for(let i = 0; i < advancedInput.length; i++) {
		advancedInput[i].addEventListener("input", () => {
			const filteredIngredients = ingredients.filter(ingredient => {
                return ingredient.toLowerCase().includes(advancedInput[0].value.toLowerCase())
            })
 			const filteredAppliances = appliances.filter(appliance => {
                return appliance.toLowerCase().includes(advancedInput[1].value.toLowerCase());
            })
 			const filteredUstensils = ustensils.filter(ustensil => {
                return ustensil.toLowerCase().includes(advancedInput[2].value.toLowerCase())
            })
			ingList.innerHTML = ""
			for(let j=0; j<filteredIngredients.length; j++) {
				const ingredientSpan = document.createElement("span");
				ingList.appendChild(ingredientSpan)
				ingredientSpan.textContent = filteredIngredients[j]
			} //split function
/* 			filteredIngredients.forEach(ingredient => {
				ingList.appendChild(ingredientSpan)
				ingredientSpan.textContent = ingredient
			}) */ //not working
            console.log("filtered appliance",filteredAppliances)
            console.log("filtered ingrediens", filteredIngredients)
            console.log("filtered ustensils", filteredUstensils)
			return filteredIngredients || filteredAppliances || filteredUstensils
		})
	}
}

function createTag() {
	for(let i=0; i<ingredientSpans.length; i++) {
		ingredientSpans[i].addEventListener("click", () => {
			const tag = document.createElement("span")
			tag.classList.add("tag");
			tagSection.appendChild(tag)
			tag.textContent = ingredientSpans[i].innerHTML
		})
	}
}


function search() {

	//liste de fonctions 
}