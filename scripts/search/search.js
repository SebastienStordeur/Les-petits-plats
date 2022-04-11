//Filtering with main input
function mainInputFiltering(recipes) {
	input.addEventListener("input", () => {
		if(input.value.length < 3) {
			recipeSection.innerHTML = "";
			createRecipeCard(recipes);
			return recipes;
		} 	else {
			//Filtering recipes
			const filteredRecipes = recipes.filter(recipe => {
				recipe.ingredients.forEach(ing => console.log("ingredient",ing))
				return recipe.name.toLowerCase().includes(input.value.toLowerCase()) || 
				recipe.description.toLowerCase().includes(input.value.toLowerCase())  //|| 
				//recipe.ingredients.forEach(ing => ing.toLowerCase().includes(input.value.toLowerCase()))
			});
			console.log(filteredRecipes)
			createArrays(filteredRecipes)
			recipeSection.innerHTML = "";
			createRecipeCard(filteredRecipes);
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
	console.log("ingredients", ingredients)
	attributeItems(ingredients, appliances, ustensils)
  	return ({ ingredients: [...ingredients], appliances: [...appliances], ustensils: [...ustensils] })
}

//fill lists with ingredients ustensils and appliances
 function attributeItems(ingredients, appliances, ustensils) {
	lists.forEach(list => {
		list.innerHTML = ""
	})

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
function advancedInputFiltering(ingredients, appliances, ustensils) {
	advancedInput.forEach((input) => {
		input.addEventListener("input", () => {
			filterArrays(ingredients, 0)
			filterArrays(appliances, 1)
			filterArrays(ustensils, 2)
		})
	})
}

//Recreate arrays of filtered elements
function filterArrays(elements, index) {
	const filteredElement = elements.filter(element => {
		return element.toLowerCase().includes(advancedInput[index].value.toLowerCase())
	})
	console.log("filter element",filteredElement)
	lists[index].innerHTML = ""
 	filteredElement.forEach((element) => {
		const span = document.createElement("span");
		lists[index].appendChild(span);
		span.textContent = element
	})
}

//create tag and filter recipes
function createTag(recipes) {
	lists.forEach((list, index) => {
		const spans = list.getElementsByTagName("span")
		for(let i=0; i<spans.length; i++) {
			spans[i].addEventListener("click", () => {
				const tag = document.createElement("span")
				tag.classList.add(`tag${index}`);
				tagSection.appendChild(tag)
				tag.innerHTML = spans[i].innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>"
				
				// filtre les recettes par rapport au choix par ingrédients si ingrédients ect
				// puis réafficher les possibilités filtrer
				const filteredRecipes = recipes.filter(recipe => {
					return recipe.appliance.includes(spans[i].innerHTML)
				})

				recipeSection.innerHTML = ""
				list.innerHTML = ""
				createRecipeCard(filteredRecipes)
				//createArrays()
				console.log(filteredRecipes)
				deleteTag()
			})
		}
	})
}

function deleteTag() {
	if(tagSection == "") return
	else {
		const crossTags = document.querySelectorAll(".delete-tag");
		crossTags.forEach((tag) => {
			tag.addEventListener("click", () => {
				tag.parentElement.remove()
			})
		}) 
	}
}