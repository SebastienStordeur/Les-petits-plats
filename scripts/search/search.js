//Filtering with main input
async function mainInputFiltering(recipes) {
	input.addEventListener("input", async () => {
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



			arrays(filteredRecipes)
			//attribute function () attributeItems(tableaux filtrés)
			recipeSection.innerHTML = "";
			createRecipeCard(filteredRecipes);
			return filteredRecipes;
		}
	});
}



function arrays(filteredRecipes) {
	var ingredients = [];
	var ustensils = [];
	var appliances = [];
	console.log(appliances)
	for(let i = 0; i<filteredRecipes.length; i++) {
		if(!appliances.includes(filteredRecipes[i].appliance)) appliances.push(filteredRecipes[i].appliance)
	
		filteredRecipes[i].ustensils.forEach((ustensil) => {
			if(!ustensils.includes(ustensil)) ustensils.push(ustensil)
		})

		filteredRecipes[i].ingredients.forEach((ingredient) => {
			if(!ingredients.includes(ingredient.ingredient)) ingredients.push(ingredient.ingredient)
		})
	}
	console.log("new array aplpiance", appliances)
	console.log("new ingredients array", ingredients)
	console.log("new ustensisl array", ustensils)

	attributeItems(ingredients, appliances, ustensils)

	return (ingredients, ustensils, appliances)
 }

//Create ingredients, ustensils and appliances arrays
function createArrays(recipes) {

	var ingredients = [];
	var appliances = [];
	var ustensils = [];
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
	ingList.innerHTML = ""
	appList.innerHTML = ""
	ustList.innerHTML = ""
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



//only ingredients 
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

//not active yet
function search() {
	const input = document.querySelector(".search-bar");
	//liste de fonctions
	//main input
	async function filterMainInput(recipes) {
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
	
				recipeSection.innerHTML = "";
				createRecipeCard(filteredRecipes);
				return filteredRecipes;
			}
		});
	}
	//tag
	//filtrer les ingredients et autres avec leur input
	//updates
}