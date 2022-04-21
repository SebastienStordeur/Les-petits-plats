let recipeList = fetch('../../data/recipes.json').then(response => response.json()).then(data => console.log(data))

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
				return recipe.ingredients.filter(({ ingredient }) => ingredient.toLowerCase().includes(input.value.toLowerCase())).length > 0 ||
					recipe.name.toLowerCase().includes(input.value.toLowerCase()) ||
					recipe.description.toLowerCase().includes(input.value.toLowerCase());
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
	for (let i = 0; i < recipes.length; i++) {
		if (!appliances.includes(recipes[i].appliance)) appliances.push(recipes[i].appliance);

		recipes[i].ustensils.forEach((ustensil) => {
			if (!ustensils.includes(ustensil)) ustensils.push(ustensil);
		});

		recipes[i].ingredients.forEach((ingredient) => {
			if (!ingredients.includes(ingredient.ingredient)) ingredients.push(ingredient.ingredient);
		});
	};
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
		const spans = list.getElementsByTagName("span")
		for (let i = 0; i < spans.length; i++) {
			spans[i].addEventListener("click", () => {
				const tag = document.createElement("span");
				let filteredRecipes;
				tag.classList.add(`tag${index}`);
				tagSection.appendChild(tag);
				tag.innerHTML = spans[i].innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>";
/* 
 				filteredRecipes = recipes.filter(recipe => {
					// recipe.ingredients.filter(({ ingredient }) => ingredient.includes(spans[i].innerHTML))
					// recipe.ingredients.filter(({ ingredient }) => console.log(ingredient))
					 return recipe.ingredients.filter(( value ) => {
						 
						//  if (value.ingredients === spans[i].innerHTML) {
						// 	 return recipe;
						//  }
						// console.log("Ingredient du filer : " + ingredient)
						// console.log("INNER HTMl  " + spans[i].innerHTML)
						// if ()
						// return ingredient.includes(spans[i].innerHTML)
						//  if (ingredient.includes(spans[i].innerHTML)) {
						//  	console.log('CONTIENt')
						// 	 return recipe
						//  } 
						// return ingredient.includes(spans[i].innerHTML)
					})
				}) */
				//console.log(filteredRecipes)
 				filteredRecipes = recipes.filter(recipe => {
					return recipe.ustensils.includes(spans[i].innerHTML) || recipe.appliance.includes(spans[i].innerHTML)
				})
				console.log(filteredRecipes)
				mainInputFiltering(filteredRecipes);
				createRecipeCard(filteredRecipes);
				deleteTag(recipeList); //tableau filtré
			});
		};
	});
};

function deleteTag(recipes) {
	console.log(recipes)
	const crossTags = document.querySelectorAll(".delete-tag");
	let filteredRecipes

	if (tagSection == "") return;
	else {
		crossTags.forEach(tag => {

			tag.addEventListener("click", () => {
				tag.parentElement.remove();

				if (crossTags.length > 1) {
					console.log("Liste supérieur à 2")
					console.log(recipes)
					filteredRecipes = recipes.filter(recipe => {
						return recipe.ustensils.includes(tag.parentElement.innerHTML.split("<")[0]) ||
							recipe.appliance.includes(tag.parentElement.innerHTML.split("<")[0])
					})

					console.log("length > 1", filteredRecipes)
					createRecipeCard(filteredRecipes);
				} else {
					console.log("length = 1")
					filteredRecipes = recipes
					createRecipeCard(filteredRecipes);
				}
			})

		})
	}
}

/* function deleteTag(recipes) {
	const crossTags = document.querySelectorAll(".delete-tag");
	if(tagSection == "") return;
	else {
		crossTags.forEach((tag) => {
			tag.addEventListener("click", () => {
				tag.parentElement.remove();
				let filteredRecipes
				//filter recipes a partir de la liste de départ
				for(let j =0; j<crossTags.length; j++) {
					console.log("legnth", crossTags.length)
					
					if(crossTags.length > 1) {
						console.log(crossTags)
						console.log("list supérieur à 2")
						
						filteredRecipes = recipes.filter(recipe => {
							return recipe.ustensils.includes(crossTags[j].parentElement.innerHTML.split("<")[0]) || 
							recipe.appliance.includes(crossTags[j].parentElement.innerHTML.split("<")[0])
						})

						console.log("if tag>1", filteredRecipes)
						createRecipeCard(filteredRecipes);

					}	else {
						filteredRecipes = recipes
						createRecipeCard(filteredRecipes);
					}
					console.log("recettes filtrées", filteredRecipes)
				}
			});
		});
	};
}; */


// let tags = [];

// tag.addEventListener('click' , (event) => {
// 	const currentTag = event.target.getAttribute("data-tag");
// 	tags.push(currentTag);

// 	displayRecipe()

// 	tags.filter
// 	.remove

// 	displayRecipe()


// })

// function displayRecipe()