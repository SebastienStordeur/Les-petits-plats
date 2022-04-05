//Filtering with main input
async function mainInputFiltering(recipes) {
	const { ingredients, ustensils, appliances } = await createArrays()
	console.log("ustensils", ustensils)
	console.log(ingredients)
	console.log("appareils", appliances)
	input.addEventListener("input", () => {
		if(input.value.length < 3) {
			recipeSection.innerHTML = "";
			createRecipeCard(recipes);
			return recipes;
		} 	else {
			//Filtering recipes
			const results = recipes.filter(recipe => {
				return recipe.name.toLowerCase().includes(input.value.toLowerCase()) || 
				recipe.description.toLowerCase().includes(input.value.toLowerCase()) /* || 
				recipe.ingredients.toLowerCase().includes(input.value.toLowerCase()); */
			});
			console.log("resultats", results)
/* 			const filteredAppliances = appliances.filter(appliance => {
				appliance.includes(results.forEach((result) => {
					return result.appliance
				}))
			})
			const filteredIngredients = ingredients.filter(ingredient => {
				ingredient.includes(results.forEach(result => {
					return result.ingredient
				}))
			}) */
/* 			console.log("filtre ingredient", filteredIngredients)
			console.log("filtre apparaeil", filteredAppliances) */
			recipeSection.innerHTML = "";
			createRecipeCard(results);
			console.log(results);
			return results;
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
