//Filtering with main input
function mainInputFiltering(recipes) {
    input.addEventListener("input", () => {
        let filteredRecipes = [];
        if(input.value.length < 3) {
			filteredRecipes = recipes;
			createRecipeCard(recipes);
			return filteredRecipes;
        } else {
            for(let recipe of recipes) {
                const lowerCaseName = recipe.name.toLowerCase().includes(input.value.toLowerCase());
                const lowerCaseDescription = recipe.description.toLowerCase().includes(input.value.toLowerCase());
                //const lowerCaseIngredient = recipe.ingredients.toLowerCase().includes(input.value.toLowerCase())
                if(lowerCaseName || lowerCaseDescription) {
                    filteredRecipes.push(recipe);
                }
            }
            console.log(filteredRecipes)
            createRecipeCard(filteredRecipes);
            return filteredRecipes;
        }

    })
}

//Create ingredients, ustensils and appliances arrays
function createArrays(recipes) {
    var ingredients = [];
	var appliances = [];
	var ustensils = [];
    let i = 0;
    while(i<recipes.length) {
        if(!appliances.includes(recipes[i].appliance)) appliances.push(recipes[i].appliance);
		
        for(let ustensil of recipes[i].ustensils) {
            if(!ustensils.includes(ustensil)) ustensils.push(ustensil)
        }

        for(let ingredient of recipes[i].ingredients) {
            if(!ingredients.includes(ingredient.ingredient)) ingredients.push(ingredient.ingredient);
        }
        i++;
    };
    attributeItems(ingredients, 0);
	attributeItems(appliances, 1);
	attributeItems(ustensils, 2);
    createTag(recipes);
	advancedInputFiltering(ingredients, appliances, ustensils, recipes)
  	return ({ ingredients: [...ingredients], appliances: [...appliances], ustensils: [...ustensils] });
}

//fill lists with ingredients ustensils and appliances
function attributeItems(elements, index) {
    lists[index].innerHTML = "";
    for(let element of elements) {
        const span = document.createElement("span");
        lists[index].appendChild(span);
        span.textContent = element;
    };
};

//filter ingredients/appliances/ustensils
function advancedInputFiltering(ingredients, appliances, ustensils, recipes) {
    for(let input of advancedInput) {
        input.addEventListener("input", () => {
            filterArrays(ingredients, 0);
			filterArrays(appliances, 1);
			filterArrays(ustensils, 2);
			createTag(recipes);
        });
    };
};

//Recreate arrays of filtered elements
function filterArrays(elements, index) {
    let filteredElements = [];
    for(let element of elements) {
        const lowerCaseElement = element.toLowerCase().includes(advancedInput[index].value.toLowerCase())
        if(lowerCaseElement) filteredElements.push(element);
    };
	lists[index].innerHTML = "";
    for(let element of filteredElements) {
        const span = document.createElement("span");
		lists[index].appendChild(span);
		span.textContent = element;
    };
};

function createTag(recipes) {
    for(let index = 0; index < lists.length; index++) {
        const spans = lists[index].getElementsByTagName("span");
        for(let i = 0; i < spans.length; i++) {
            spans[i].addEventListener("click", () => {
                const tag = document.createElement("spans");
                var filteredRecipes = [];
				tag.classList.add(`tag${index}`);
				tagSection.appendChild(tag);
				tag.innerHTML = spans[i].innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>";
            


                for(let recipe in recipes) {
                    //const ingredientTag = ""
                    const ingredientTag = () => {
                        for(let ingredient of recipe.ingredients) {
                            for(let ing of ingredient) {
                                console.log(ing)
                            }
                        }
                    }
                    const applianceTag = recipe.appliance.includes(spans[i].innerHTML);
                    const ustensilTag = recipe.ustensils.includes(spans[i].innerHTML);
                    if(applianceTag || ustensilTag ||ingredientTag()) {
                        filteredRecipes.push(recipe)
                    }
                }
                mainInputFiltering(filteredRecipes);
				createRecipeCard(filteredRecipes);
                //deleteTag(recipes); 
            });
        };
    };
};