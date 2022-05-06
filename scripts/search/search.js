let tags = [];
let filteredRecipes = [];

//Filtering with main input
function mainInputFiltering(recipes) {
	input.addEventListener("input", () => {
		if (input.value.length < 3) {
			filteredRecipes = recipes;
			createRecipeCard(recipes);
			return filteredRecipes;
		} else {
			filterWithInputValue(recipes)
			if(!filteredRecipes.length > 0) recipeSection.innerHTML="<span class='error'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</span>"
			else createRecipeCard(filteredRecipes);
			return filteredRecipes
		};
	});
};

function filterWithInputValue(recipes) {
	filteredRecipes = recipes.filter(recipe => {
		const lowerCaseName = recipe.name.toLowerCase().includes(input.value.toLowerCase());
		const lowerCaseDescription = recipe.description.toLowerCase().includes(input.value.toLowerCase());
		const lowerCaseIngredients = recipe.ingredients.filter(({ ingredient }) => ingredient.toLowerCase().includes(input.value.toLowerCase())).length > 0
		return  lowerCaseIngredients | lowerCaseName | lowerCaseDescription;
	});
}

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

function datatypeFilter(span, dataType, recipes) {
	if(dataType === 0) {
		filteredRecipes = [];
		filteredRecipes.push(recipes.filter(recipe => {
			recipe.ingredients.filter(({ingredient}) => {
				if(ingredient.includes(span.innerHTML)) return filteredRecipes.push(recipe);
			});
		}));
		filteredRecipes = filteredRecipes.slice(0, filteredRecipes.length-1)
	} 
	if(dataType === 1) filteredRecipes = recipes.filter(recipe => recipe.appliance.includes(span.innerHTML))
	if(dataType === 2) filteredRecipes = recipes.filter(recipe => recipe.ustensils.includes(span.innerHTML))
}

//create tag and filter recipes
function createTag(recipes) {
	lists.forEach((list, index) => {
		const spans = Array.from(list.getElementsByTagName("span"));
		spans.forEach(span => {
			span.addEventListener("click", () => {
				const dataType = index;
				const isFound = tags.find(elementTag => elementTag === span.innerHTML)
				if(!isFound) {
					const tag = document.createElement("span");
					tag.classList.add(`tag${index}`, "tag");
					tag.setAttribute("datatype", dataType)
					tagSection.appendChild(tag);
					tag.innerHTML = span.innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>";
					tags.push(span.innerHTML);
					datatypeFilter(span, dataType, recipes)
				}
				else return;
				mainInputFiltering(filteredRecipes);
				createRecipeCard(filteredRecipes);
				deleteTag(tags);
			});
		});
	});
};


//double tableau tags + datatypes liée, création de tags pour l'un puis ajout du datatype dans le second tableau
/* async function deleteTag() {
	const { recipes } = await getRecipes(); //hors fonction
	const crossTags = document.querySelectorAll(".delete-tag"); //Croix pour suppression de tags
	
	if(tagSection.innerHTML == "") return;
	else {
		crossTags.forEach(crossTag => {
			crossTag.addEventListener("click", () => {
				crossTag.parentElement.remove();
				//Filtrage des tags
				tags = tags.filter(elementTag => { return elementTag != crossTag.parentElement.innerText })
				//si il reste des tags alors filtrage des recettes sinon filteredRecipe = recipes
				if(tags.length === 0) {
					if(input.value.length >= 3) filterWithInputValue(recipes)
					else filteredRecipes = recipes
					createRecipeCard(filteredRecipes)
					mainInputFiltering(filteredRecipes)
				}
				if(tags.length >= 1) {
					if(input.value.length >= 3) filterWithInputValue(recipes)
					else filteredRecipes = recipes
					tags.forEach(elementTag => {
						filteredRecipes = filteredRecipes.filter(recipe => {
							const checkIngredients = recipe.ingredients.filter(({ingredient}) => { 
								console.log(ingredient)
								ingredient.includes(elementTag)
							}) 
/						const checkAppliance = recipe.appliance.includes(elementTag);
							const checkUstensils = recipe.ustensils.includes(elementTag); 
							return  checkIngredients   ||  checkAppliance || checkUstensils 
						})
						console.log("recettes filtrées",filteredRecipes)
					})
					createRecipeCard(filteredRecipes)
				};
			});
		});
	};
}; */

async function deleteTag() {
	const { recipes } = await getRecipes(); //hors fonction
	const crossTags = document.querySelectorAll(".delete-tag"); //Croix pour suppression de tags
	
	if(tagSection.innerHTML == "") return;
	else {
		crossTags.forEach(crossTag => {
			crossTag.addEventListener("click", () => {
				crossTag.parentElement.remove();
				//Filtrage des tags
				tags = tags.filter(elementTag => { return elementTag != crossTag.parentElement.innerText })
				//si il reste des tags alors filtrage des recettes sinon filteredRecipe = recipes
				if(tags.length === 0) {
					if(input.value.length >= 3) filterWithInputValue(recipes)
					else filteredRecipes = recipes
					createRecipeCard(filteredRecipes)
					mainInputFiltering(filteredRecipes)
				}
				if(tags.length >= 1) {
					if(input.value.length >= 3) filterWithInputValue(recipes)
					else filteredRecipes = recipes
					
					//On selection les tags présents sur le dom
					const tagList = document.querySelectorAll(".tag");
					

					//Pour chaque tag, on récupère les recettes filtrées pour CET+
					
					tagList.forEach((tag, index) => {

						//Idée : Push toute les recettes issues du filtrages dans un même tableau puis ne concervent que ceux n'apparaissant
						//autant de foisq ue le nombre de tag restants => si 3 tags, si une recette ressort 3 fois, alors => filteredRecipes
						if(tag.classList.contains("tag0")) {
							//filteredRecipes = [];
							let array = []
							let pushedArray = []
							filteredRecipes.push(filteredRecipes.filter(recipe => {
								recipe.ingredients.filter(({ingredient}) => {
									if(ingredient.includes(tag.innerText)) return array.push(recipe);
								});
							}));
							console.log(array)
							
							array.forEach(element => {
								
								pushedArray.push(element)
							})
							/* array = array.slice(0, array.length-1) *///filteredRecipes.slice(0, filteredRecipes.length-1)
							console.log("array", array)
							//filteredRecipes = array
							console.log("recetets" ,pushedArray)
						}
						if(tag.classList.contains("tag1")) filteredRecipes = filteredRecipes.filter(recipe => recipe.appliance.includes(tag.innerText))
						if(tag.classList.contains("tag2")) filteredRecipes = filteredRecipes.filter(recipe => recipe.ustensils.includes(tag.innerText))

						console.log("tag", tag.innerText, "recette filtrée", filteredRecipes)
					})
					filteredRecipes = filteredRecipes.slice(0, filteredRecipes.length-1)
					console.log(filteredRecipes)
					createRecipeCard(filteredRecipes)
					

					//Affichage
				};
			});
		});
	};
};