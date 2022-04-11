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
	console.log(appliances)
	attributeItems(ingredients, appliances, ustensils)
  	return ({ ingredients: [...ingredients], appliances: [...appliances], ustensils: [...ustensils] })
}

//fill lists with ingredients ustensils and appliances
 function attributeItems(ingredients, appliances, ustensils) {
	lists.innerHTML = ""

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
/*
function advancedInputFiltering(ingredients, appliances, ustensils) { //working
	advancedInput[0].addEventListener("input", () => {
		const filteredIngredients = ingredients.filter(ingredient => {
			return ingredient.toLowerCase().includes(advancedInput[0].value.toLowerCase())
		})
		lists[0].innerHTML = ""
		for(let j=0; j<filteredIngredients.length; j++) {
			const ingredientSpan = document.createElement("span");
			lists[0].appendChild(ingredientSpan)
			ingredientSpan.textContent = filteredIngredients[j]
		}
	})

	advancedInput[1].addEventListener("input", () => {
		const filteredAppliances = appliances.filter(appliance => {
			return appliance.toLowerCase().includes(advancedInput[1].value.toLowerCase());
		})
		lists[1].innerHTML = ""
		for(let j=0; j<filteredAppliances.length; j++) {
			const applianceSpan = document.createElement("span");
			lists[1].appendChild(applianceSpan)
			applianceSpan.textContent = filteredAppliances[j]
		}
	})

	advancedInput[2].addEventListener("input", () => {
		const filteredUstensils = ustensils.filter(ustensil => {
			return ustensil.toLowerCase().includes(advancedInput[2].value.toLowerCase())
		})
		lists[2].innerHTML = ""
		for(let j=0; j<filteredUstensils.length; j++) {
			const ustensilSpan = document.createElement("span");
			lists[2].appendChild(ustensilSpan)
			ustensilSpan.textContent = filteredUstensils[j]
		}
	})
} */

function advancedInputFiltering(ingredients, appliances, ustensils) {
	advancedInput.forEach((input) => {
		input.addEventListener("input", () => {
			filterArrays(ingredients, 0)
			filterArrays(appliances, 1)
			filterArrays(ustensils, 2)
		})
	})
}

function filterArrays(elements, index) {
	const filteredElement = elements.filter(element => {
		return element.toLowerCase().includes(advancedInput[index].value.toLowerCase())
	})
	console.log("filter element",filteredElement)
	lists[index].innerHTML = ""
	elements.forEach(element => {
		const newSpan = document.createElement("span");
		lists[index].appendChild(newSpan);
		newSpan.textContent = element
	})
}



/*function advancedInputFiltering(ingredients, appliances, ustensils) {
	for(let i = 0; i < advancedInput.length; i++) {
		advancedInput[i].addEventListener("input", () => { //pb avec le i chaque i
			console.log(i)
			const filteredIngredients = ingredients.filter(ingredient => {
                return ingredient.toLowerCase().includes(advancedInput[i].value.toLowerCase())
            })
 			const filteredAppliances = appliances.filter(appliance => {
                return appliance.toLowerCase().includes(advancedInput[i].value.toLowerCase());
            })
 			const filteredUstensils = ustensils.filter(ustensil => {
                return ustensil.toLowerCase().includes(advancedInput[i].value.toLowerCase())
            })
			console.log(filteredIngredients)
			console.log(filteredAppliances)
			console.log(filteredUstensils)
			lists[i].innerHTML = ""*/

/* 			function test(element, index) {
				lists[i].innerHTML = ""
				for(let j=0; j<element.length; j++) {
					
					const newSpan = document.createElement("span");
					lists[i].appendChild(newSpan);
					newSpan.textContent = element[j]
				}
			}

			test(filteredIngredients, 0)
			test(filteredAppliances, 1)
			test(filteredUstensils, 2) */
			
/*  			for(let j=0; j<filteredIngredients.length; j++) {
				const ingredientSpan = document.createElement("span");
				lists[0].appendChild(ingredientSpan)
				ingredientSpan.textContent = filteredIngredients[j]
			} //split function
			for(let j=0; j<filteredAppliances.length; j++) {
				const applianceSpan = document.createElement("span");
				lists[1].appendChild(applianceSpan)
				applianceSpan.textContent = filteredAppliances[j]
			}
			for(let j=0; j<filteredAppliances.length; j++) {
				const ustensilSpan = document.createElement("span");
				lists[2].appendChild(ustensilSpan)
				ustensilSpan.textContent = filteredUstensils[j]
			} 
			return filteredIngredients || filteredAppliances || filteredUstensils
		})
	}
} */

//only ingredients 
/* function createTag(recipes) {
	for(let i=0; i<ingredientSpans.length; i++) {
		ingredientSpans[i].addEventListener("click", () => {
			const tag = document.createElement("span")
			tag.classList.add("tag");
			tagSection.appendChild(tag)
			tag.textContent = ingredientSpans[i].innerHTML
			const filteredRecipes = recipes.filter(recipe => {
				return recipe.name.includes(tag.innerHTML) ||
				recipe.description.includes(tag.innerHTML)
			})
			recipeSection.innerHTML = "";
			createRecipeCard(filteredRecipes)
			console.log(filteredRecipes)
		})
	}
} */

function createTag() {
	lists.forEach((list, index) => {
		const spans = list.getElementsByTagName("span")
		for(let i=0; i<spans.length; i++) {
			spans[i].addEventListener("click", () => {
				const tag = document.createElement("span")
				tag.classList.add(`tag${index}`);
				tagSection.appendChild(tag)
				tag.innerHTML = spans[i].innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>"
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