//Filtering with main input
function mainInputFiltering(recipes) {
	input.addEventListener("input", () => {
		let filteredRecipes
		if(input.value.length < 3) {
			filteredRecipes = recipes
			createRecipeCard(recipes);
			createArrays(recipes)
			return filteredRecipes;
		} 	else {
			//Filtering recipes
			filteredRecipes = recipes.filter(recipe => {
				return recipe.ingredients.filter(({ingredient}) => ingredient.toLowerCase().includes(input.value.toLowerCase())).length > 0
				||
				recipe.name.toLowerCase().includes(input.value.toLowerCase())
				||
				recipe.description.toLowerCase().includes(input.value.toLowerCase())
			})
			createArrays(filteredRecipes)
			createRecipeCard(filteredRecipes);
			createTag(filteredRecipes)
			return filteredRecipes;
		}
	});
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
	attributeItems(ingredients, appliances, ustensils)
	createTag(recipes)
  	return ({ ingredients: [...ingredients], appliances: [...appliances], ustensils: [...ustensils] })
}

//fill lists with ingredients ustensils and appliances
// problème = si on supprime tout le champ input, on ne récupère pas tout les ingredients ect
/*
function attributeItems(elements, index) {
	lists[index].innerHTML = "";
	elements.forEach(element => {
		const span = document.createElement("span");
		lists[index].appendChild(span);
		span.textContent = element;
	})
}

*/
function attributeItems(ingredients, appliances, ustensils) {
	lists.forEach(list => list.innerHTML = "")

	//Attributing ingredients to the div (for tag and advance search)
 	ingredients.forEach(ingredient => {
		const span = document.createElement("span");
		lists[0].appendChild(span);
		span.textContent = ingredient;
	})
	//Attributing appliances to the div (for tag and advance search)
	appliances.forEach(appliance => {
		const span = document.createElement("span");
		lists[1].appendChild(span);
		span.textContent = appliance;
	})
	//Attributing ustensils to the div (for tag and advance search)
	ustensils.forEach(ustensil => {
		const ustensilSpan = document.createElement("span");
		lists[2].appendChild(ustensilSpan);
		ustensilSpan.textContent = ustensil;
	})
}

//filter ingredients/appliances/ustensils
function advancedInputFiltering(ingredients, appliances, ustensils, recipes) {
	advancedInput.forEach((input) => {
		input.addEventListener("input", () => {
			filterArrays(ingredients, 0)
			filterArrays(appliances, 1)
			filterArrays(ustensils, 2)
			createTag(recipes)
		})
	})
}

//Recreate arrays of filtered elements
function filterArrays(elements, index) {
	const filteredElement = elements.filter(element => {
		return element.toLowerCase().includes(advancedInput[index].value.toLowerCase())
	})
	lists[index].innerHTML = ""
 	filteredElement.forEach((element) => {
		const span = document.createElement("span");
		lists[index].appendChild(span);
		span.textContent = element
	})
}

//create tag and filter recipes
async function createTag(recipes) {
	
	lists.forEach((list, index) => {
		const spans = list.getElementsByTagName("span")
		for(let i=0; i<spans.length; i++) {
			spans[i].addEventListener("click", () => {
				const tag = document.createElement("span")
				let filteredRecipes
				
				tag.classList.add(`tag${index}`);
				tagSection.appendChild(tag)
				tag.innerHTML = spans[i].innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>"
				
				// filtre les recettes par rapport au choix par ingrédients si ingrédients ect
				// puis réafficher les possibilités filtrer
/* 				filteredRecipes = recipes.filter(recipe => {
					recipe.ingredients.filter(({ingredient}) => ingredient.includes(spans[i].innerHTML)).length > 0
				}) */

				//ustensils filter
 				
 				filteredRecipes = recipes.filter(recipe => {
					console.log(recipe)
					return recipe.ustensils.includes(spans[i].innerHTML)
				})
				
				//Appliance filter
/* 					filteredRecipes = recipes.filter(recipe => {
						return recipe.appliance.includes(spans[i].innerHTML)
					})  */
				
				mainInputFiltering(filteredRecipes)
				createRecipeCard(filteredRecipes)
				createArrays(filteredRecipes)
				console.log(filteredRecipes)
				deleteTag()
			})
		}
	})
}

async function deleteTag() {
	const recipesList = await getRecipes()
	if(tagSection == "") return
	else {
		const crossTags = document.querySelectorAll(".delete-tag");
		crossTags.forEach((tag) => {
			tag.addEventListener("click", () => {
				tag.parentElement.remove()
				var filteredRecipes = recipesList
				createRecipeCard(filteredRecipes)
				//refiltre a partir des recettes de base + applique les filtres
			})
		}) 
	}
}