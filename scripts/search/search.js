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
			filteredRecipes = recipes.filter(recipe => {
				const lowerCaseName = recipe.name.toLowerCase().includes(input.value.toLowerCase());
                const lowerCaseDescription = recipe.description.toLowerCase().includes(input.value.toLowerCase());
				const lowerCaseIngredients = recipe.ingredients.filter(({ ingredient }) => ingredient.toLowerCase().includes(input.value.toLowerCase())).length > 0
				return  lowerCaseIngredients | lowerCaseName | lowerCaseDescription;
			});
			if(!filteredRecipes.length > 0) recipeSection.innerHTML="<span class='error'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</span>"
			else createRecipeCard(filteredRecipes);
			return filteredRecipes
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
				const dataType = index;
				const isFound = tags.find(elementTag => elementTag === span.innerHTML)
				if(!isFound) {
					const tag = document.createElement("span");
					tag.classList.add(`tag${index}`);
					tag.setAttribute("datatype", dataType)
					tagSection.appendChild(tag);
					tag.innerHTML = span.innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>";
					tags.push(span.innerHTML);
	
					//datatypes => 0 = ingredients, 1 = appareils, 2 = ustensils 
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
				else return;
				console.log(tags)
				mainInputFiltering(filteredRecipes);
				createRecipeCard(filteredRecipes);
				deleteTag(tags);
			});
		});
	});
};

async function deleteTag() {
	const { recipes } = await getRecipes();
	const crossTags = document.querySelectorAll(".delete-tag"); //Croix pour suppression de tags

	if(tagSection.innerHTML == "") return;
	else {
		crossTags.forEach(crossTag => {
			crossTag.addEventListener("click", () => {
				crossTag.parentElement.remove();
				
				if(tags.length == 1) {
					tags = [];
					filteredRecipes = recipes;
					createRecipeCard(filteredRecipes);
				};

				if(tags.length > 1) {
					//const dataType = crossTag.parentElement.getAttribute("datatype");
					tagSection.childNodes.forEach(node => {
						tags = []
						tags.push(node.innerText)
						//Getattribute datatype
						console.log(node.getAttribute("datatype"))
						const dataType = node.getAttribute("datatype");
						if(dataType === 2) filteredRecipes = recipes.filter(recipe => recipe.ustensils.includes(tags[0]))
					})


/*  					filteredRecipes = recipes.filter(recipe => { 

						const isUstensilInRecipe = recipe.ustensils.includes(tagList[0])*/  /* tagList.forEach(tag => {
							return recipe.ustensils.includes(tag)
						})  */
/* 						const isApplianceInRecipe = recipe.appliance.includes(tagList[0])

						return isApplianceInRecipe || isUstensilInRecipe 
					} ) */

					createRecipeCard(filteredRecipes)
					//console.log(tagList, filteredRecipes)
				}
			});
		});
	};
};




/* let tags = [];
let recipesInitial = [];
let recipeFiltre = []

<div data-name="Lait de Coco">lait de coco</div>


document.querySelector('.tags').addEventListener('click', event => {
  const element = deleteTag(event) // il faut acceder l'event pour recupere l'element
  if (element !== null) {
     const recipes = filterRecipes()
     if (recipes) {
       displayRecipes(recipes)
     }
  }
})

document.querySelector('.tags-de-la-liste').addEventListener('click', event => {
  addTag(event)
})

function addTag(event) {
  const dataName = sdsd;
  const found = tags.find(tag => tag === dataName);
  
  if (!found) {
    tags.push(dataName)
  }
 
  return;
}

function deleteTag(event) {
  const dataName = sdsd;
  const found = tags.find(tag => tag === dataName);
  
  if (found) {
    // Suppression du tag du tableau tags
    return found;
  }
  return null;
}

function filterRecipes() {
  if(tags.length > 0) {
    // filtrage des donnees
  }
    if(tags.length > 0) {
    // filtrage des donnees
  }
  
  return;
}

function displayRecipe() {
  if (recipeFiltres.length > 0) {
    // function d'affichage avec recipeFiltre
  } else {
     // function d'affichage avec recipeInitial
  }
} */