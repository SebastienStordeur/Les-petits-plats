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
				
				let filteredRecipes =[];
				tag.classList.add(`tag${index}`);
				tagSection.appendChild(tag);
				tag.innerHTML = spans[i].innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>";
				tagList.push(spans[i].innerHTML)

				console.log(tagList)


				//working mais erreur dans la création des cartes donc filtrage des tableaux impossible
/* 				var array = filteredRecipes.push(recipes.filter(recipe => {
					recipe.ingredients.filter(({ingredient}) => {
						console.log(ingredient)
						if(ingredient.includes(spans[i].innerHTML)) return filteredRecipes.push(recipe)
					})
					console.log(filteredRecipes)
				}))

				filteredRecipes = filteredRecipes.slice(0, filteredRecipes.length-1)
				console.log("array",array)
				console.log(filteredRecipes) */

				//console.log(filteredRecipes)
 				filteredRecipes = recipes.filter(recipe => {
					return recipe.ustensils.includes(spans[i].innerHTML) || recipe.appliance.includes(spans[i].innerHTML)
				})
				console.log("recette filtrées", filteredRecipes)
				mainInputFiltering(filteredRecipes);
				createRecipeCard(filteredRecipes);
				deleteTag(tagList); //tableau filtré
			});
		};
	});
};

/* async function deleteTag(tagList) {
	const { recipes } = await getRecipes();
	const crossTags = document.querySelectorAll(".delete-tag");
	let filteredRecipes ;

	if(tagSection == "") return;
	else {
		crossTags.forEach((tag, index) => {
			tag.addEventListener("click", () => {
				//crossTags[index].parentElement.parentElement.removeChild(crossTags[index])
				tagSection.removeChild(crossTags[index].parentElement)
				tagList = []
				
				const tagSectionContent = tagSection.innerHTML
				if(crossTags.length == 1) {
					filteredRecipes = recipes
					createRecipeCard(filteredRecipes)
				}
				//Elements supprimé ne sont pas supprimé de la node list
				if(crossTags.length > 1) {
					var filteredTags = [];					
					tagList = []
					console.log(tag.parentElement.innerHTML.split("<")[0])
					tagList.push(tag.parentElement.innerHTML.split("<")[0])
					crossTags.forEach(tag => {
						console.log("tag", tag)
						filteredTags.push(tag.parentElement.innerHTML.split("<")[0])
						//tagList.push(tag.parentElement.innerHTML.split("<")[0])
					})
					console.log("crosstags,",crossTags)
					console.log("tag filtrée tableau", filteredTags)
					console.log(tagSectionContent)
					
					console.log("taglist",tagList)
					filteredRecipes = recipes.filter(recipe => {
						const isUstensilInRecipes = filteredTags.forEach(tag => {
							recipe.ustensils.includes(tag)
						})
						const isApplianceInRecipes = filteredTags.forEach(tag => {
							recipe.appliance.includes(tag)
						})

						//const isApplianceInRecipes = recipe.appliance.includes(tag.parentElement.innerHTML.split("<")[0]);
						return isUstensilInRecipes || isApplianceInRecipes
					})
					createRecipeCard(filteredRecipes)
				}
				console.log(filteredRecipes)
			})
			//console.log(tagSection.innerHTML)
		})
	}
} */

//Pour l'instant, le script détecte que l'on supprime à chaque fois LE PREMIER
//Element de la liste de tag

/* async function deleteTag() {
	const { recipes } = await getRecipes();
	const crossTags = document.querySelectorAll(".delete-tag");
	let filteredRecipes;

	if (tagSection == "") return;
	else {
		crossTags.forEach((tag, index) => {
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
					console.log("nombre de recette " + recipes.length)
					createRecipeCard(filteredRecipes);
				} else {
					console.log("length = 1")
					console.log("nombre de recettes = " + recipes.length)
					filteredRecipes = recipes
					createRecipeCard(filteredRecipes);
				}
			})
		})
	}
} */

