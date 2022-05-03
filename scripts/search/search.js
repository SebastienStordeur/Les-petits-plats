let tags = [];
let filteredRecipes = [];

//Filtering with main input
function mainInputFiltering(recipes) {
    input.addEventListener("input", () => {
        filteredRecipes = []
        if(input.value.length < 3) {
			filteredRecipes = recipes;
			createRecipeCard(recipes);
			return filteredRecipes;
        }   else {
            for(let recipe of recipes) {
                const lowerCaseName = recipe.name.toLowerCase().includes(input.value.toLowerCase());
                const lowerCaseDescription = recipe.description.toLowerCase().includes(input.value.toLowerCase());
                //const lowerCaseIngredient = recipe.ingredients.toLowerCase().includes(input.value.toLowerCase())
                var lowerCaseIngredient;
                for(let ingredient of recipe.ingredients) {
                    lowerCaseIngredient = ingredient.ingredient.toLowerCase().includes(input.value.toLowerCase())
                    if(lowerCaseIngredient /* | lowerCaseName | lowerCaseDescription */) filteredRecipes.push(recipe) //works
                }
                /* console.log(lowerCaseIngredient)
                if( lowerCaseName | lowerCaseDescription  | lowerCaseIngredient ) {     

                    filteredRecipes.push(recipe)
                }; */
                if(!filteredRecipes.length > 0) recipeSection.innerHTML="<span class='error'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</span>"
                else createRecipeCard(filteredRecipes);
            };
            return filteredRecipes;
        };
    });
};

//Create ingredients, ustensils and appliances arrays
function createArrays(recipes) {
    var ingredients = [];
	var appliances = [];
	var ustensils = [];
    for(let i=0; i<recipes.length; i++) {
        if(!appliances.includes(recipes[i].appliance)) appliances.push(recipes[i].appliance);
		
        for(let ustensil of recipes[i].ustensils) {
            if(!ustensils.includes(ustensil)) ustensils.push(ustensil)
        }

        for(let ingredient of recipes[i].ingredients) {
            if(!ingredients.includes(ingredient.ingredient)) ingredients.push(ingredient.ingredient);
        }
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
    let filteredRecipes = [];
    for(let index = 0; index < lists.length; index++) {
        const spans = lists[index].getElementsByTagName("span");
        for(let i = 0; i < spans.length; i++) {
            spans[i].addEventListener("click", () => {
                const dataType = index;
                const isFound = tags.find(elementTag => elementTag === spans[i].innerHTML);
                if(!isFound) {
                    const tag = document.createElement("spans");
                    tag.classList.add(`tag${index}`);
                    tag.setAttribute("datatype", index)
                    tagSection.appendChild(tag);
                    tag.innerHTML = spans[i].innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>";
                    tags.push(spans[i].innerHTML);

                    //datatypes => 0 = ingredients, 1 = appareils, 2 = ustensils 
                    if(dataType === 0) {
                        filteredRecipes = [];
                        for(let recipe of recipes) {
                            for(let ingredient of recipe.ingredients) {
                                if(ingredient.ingredient.includes(spans[i].innerHTML)) filteredRecipes.push(recipe);
                            };
                        };
                    };
                    if(dataType === 1) {
                        for(let recipe of recipes) {
                            if(recipe.appliance.includes(spans[i].innerHTML)) filteredRecipes.push(recipe);
                        };
                    };
                    if(dataType === 2) {
                        for(let recipe of recipes) {
                            if(recipe.ustensils.includes(spans[i].innerHTML)) filteredRecipes.push(recipe);
                        };
                    };
                }
                else return;
                mainInputFiltering(filteredRecipes);
				createRecipeCard(filteredRecipes);
                deleteTag(); 
            });
        };
    };
};

async function deleteTag() {
    const { recipes } = await getRecipes();
	const crossTags = document.querySelectorAll(".delete-tag"); //Croix pour suppression de tags

    if(tagSection.innerHTML == "") return;
    else {
        for(let crossTag of crossTags) {
            crossTag.addEventListener("click", () => {
                crossTag.parentElement.remove();
                
                if(tags.length === 1) {
                    tags = [];
                    filteredRecipes = recipes;
                    createRecipeCard(filteredRecipes)
                };

                if(tags.length > 1) {
                    //remove the tags we clicked on
                    filteredRecipes = []
                    for(let i = 0; i<tags.length; i++) {
                        if(tags[i] == crossTag.parentElement.innerText) tags.splice(i, 1);
                    };
                    //filter
                    for(let elementTag of tags) {
                        console.log(tags)
                        for(let recipe of recipes) { //Mauvaise souorce de filtrage
                            if(recipe.ustensils.includes(elementTag) | recipe.appliance.includes(elementTag)) filteredRecipes.push(recipe)
                            console.log(filteredRecipes)
                            createRecipeCard(filteredRecipes)
                        }
                    };
                };
            });
        };
    };
};