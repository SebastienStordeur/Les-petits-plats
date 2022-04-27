let tagList = [];

//Filtering with main input
function mainInputFiltering(recipes) {
	input.addEventListener("input", () => {
		let filteredRecipes;
		if (input.value.length < 3) {
			filteredRecipes = recipes;
			createRecipeCard(recipes);
			return filteredRecipes;
		} else {
			//Filtering recipes
			filteredRecipes = recipes.filter(recipe => {
				const lowerCaseName = recipe.name.toLowerCase().includes(input.value.toLowerCase());
                const lowerCaseDescription = recipe.description.toLowerCase().includes(input.value.toLowerCase());
				const lowerCaseIngredients = recipe.ingredients.filter(({ ingredient }) => ingredient.toLowerCase().includes(input.value.toLowerCase())).length > 0
				return  lowerCaseIngredients || lowerCaseName || lowerCaseDescription;
			});
			createRecipeCard(filteredRecipes);
			return filteredRecipes;
		};
	});
};

//Create ingredients, ustensils and appliances arrays
function createArrays(recipes) {
	var ingredients = [];
	var appliances = [];
	var ustensils = [];
	recipes.forEach(recipe => {
		if (!appliances.includes(recipe.appliance)) appliances.push(recipe.appliance);

		recipe.ustensils.forEach((ustensil) => {
			if (!ustensils.includes(ustensil)) ustensils.push(ustensil);
		});

		recipe.ingredients.forEach((ingredient) => {
			if (!ingredients.includes(ingredient.ingredient)) ingredients.push(ingredient.ingredient);
		});
	})
	attributeItems(ingredients, 0);
	attributeItems(appliances, 1);
	attributeItems(ustensils, 2);
	createTag(recipes);
	advancedInputFiltering(ingredients, appliances, ustensils, recipes)
	return ({ ingredients: [...ingredients], appliances: [...appliances], ustensils: [...ustensils] });
};

//fill lists with ingredients ustensils and appliances
function attributeItems(elements, index) {
	lists[index].innerHTML = "";
	elements.forEach(element => {
		const span = document.createElement("span");
		span.classList.add("span")
		lists[index].appendChild(span);
		span.textContent = element;
	})
}

//filter ingredients/appliances/ustensils
function advancedInputFiltering(ingredients, appliances, ustensils, recipes) {
	advancedInput.forEach((input) => {
		input.addEventListener("input", () => {
			filterArrays(ingredients, 0);
			filterArrays(appliances, 1);
			filterArrays(ustensils, 2);
			createTag(recipes);
		});
	});
};

//Recreate arrays of filtered elements
function filterArrays(elements, index) {
	const filteredElement = elements.filter(element => {
		return element.toLowerCase().includes(advancedInput[index].value.toLowerCase());
	});
	lists[index].innerHTML = "";
	filteredElement.forEach((element) => {
		const span = document.createElement("span");
		lists[index].appendChild(span);
		span.textContent = element;
	});
};

//create tag and filter recipes
function createTag(recipes) {
	lists.forEach((list, index) => {
		const spans = Array.from(list.getElementsByTagName("span"));
		spans.forEach(span => {
			span.addEventListener("click", () => {
				let filteredRecipes = [];
				const tag = document.createElement("span");
				tag.classList.add(`tag${index}`);
				tagSection.appendChild(tag);
				tag.innerHTML = span.innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>";
				tagList.push(span.innerHTML);

				filteredRecipes = recipes.filter(recipe => {
				/* 	const ingredientsFilter = recipe.ingredients.filter(({ingredient}) => {
						if(ingredient.includes(spans[i].innerHTML)) return filteredRecipes.push(recipe)
					}) */
 					const applianceFilter = recipe.appliance.includes(span.innerHTML);
					const ustensilsFilter = recipe.ustensils.includes(span.innerHTML);
					return applianceFilter || ustensilsFilter; 
				})
				
				console.log("recette filtrées", filteredRecipes);
				mainInputFiltering(filteredRecipes);
				createRecipeCard(filteredRecipes);
				deleteTag(tagList);
			});
		});
	});
};

				//working 				
/*  				var array = filteredRecipes.push(recipes.filter(recipe => {
					recipe.ingredients.filter(({ingredient}) => {
						if(ingredient.includes(spans[i].innerHTML)) return filteredRecipes.push(recipe)
					})
					console.log(filteredRecipes)
				}))

				filteredRecipes = filteredRecipes.slice(0, filteredRecipes.length-1) */

				//A tester
/*  				filteredRecipes.push(recipes.filter(recipe => {
					return recipe.ingredients.filter(({ingredient}) => {
						if(ingredient.includes(spans[i].innerHTML)) return filteredRecipes.push(recipe)
					})
				}))

				filteredRecipes = filteredRecipes.slice(0, filteredRecipes.length-1) */

async function deleteTag(tagList) {
	const { recipes } = await getRecipes();
	const crossTags = document.querySelectorAll(".delete-tag"); //Croix pour suppression de tags
	let filteredRecipes;

	if(tagSection.innerHTML == "") return;
	else {
		crossTags.forEach(crossTag => {
			crossTag.addEventListener("click", () => {
				crossTag.parentElement.remove();
				
				
				if(tagList.length == 1) { //taglist n'est pas mis à jour dans createTag
					tagList = [];
					filteredRecipes = recipes;
					createRecipeCard(filteredRecipes);
				};

				if(tagList.length > 1) {
					tagList = [];
					tagSection.childNodes.forEach(node => tagList.push(node.innerText))

					console.log(tagList)

					filteredRecipes = recipes.filter(recipe => {
						const isUstensilInRecipe = tagList.forEach(tag => {
							return recipe.ustensils.includes(tag)
						})

						return isUstensilInRecipe
					})

					console.log(tagList, filteredRecipes)
				}

			});
		});
	};
};