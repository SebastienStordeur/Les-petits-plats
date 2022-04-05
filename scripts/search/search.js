//Filtering with main input
async function mainInputFiltering(recipes) {
	const { ingredients, ustensils, appliances } = await createArrays()
	console.log("ustensils", ustensils)
	console.log("ingredients", ingredients)
	console.log("appareils", appliances)
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
    advancedInput.forEach((input, index) => {
        input.addEventListener("input", () => {
            const filteredAppliances = appliances.filter(appliance => {
                return appliance.toLowerCase().includes(input.value.toLowerCase());
            })
            const filteredIngredients = ingredients.filter(ingredient => {
                return ingredient.toLowerCase().includes(input.value.toLowerCase())
            })
            const filteredUstensils = ustensils.filter(ustensil => {
                return ustensil.toLowerCase().includes(input.value.toLowerCase())
            })
            console.log("filtered appliance",filteredAppliances)
            console.log("filtered ingrediens", filteredIngredients)
            console.log("filtered ustensils", filteredUstensils)
        })
    })
}