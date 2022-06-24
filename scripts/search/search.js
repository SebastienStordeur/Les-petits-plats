let tags = [];
let filteredRecipes = [];
let filteredRecipesWithTags = [];

//Filtering with main input
function mainInputFiltering(recipes) {
    input.addEventListener("input", () => {
        filteredRecipes = []
        if (input.value.length < 3) {
            filteredRecipes = recipes;
            createRecipeCard(recipes);
            return filteredRecipes;
        } else {
            filterWithInputValue(recipes)
            if (!filteredRecipes.length > 0) recipeSection.innerHTML = "<span class='error'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</span>"
            else createRecipeCard(filteredRecipes);
            return filteredRecipes;
        };
    });
};

function filterWithInputValue(recipes) {
    for (let recipe of recipes) {
        const lowerCaseName = recipe.name.toLowerCase().includes(input.value.toLowerCase());
        const lowerCaseDescription = recipe.description.toLowerCase().includes(input.value.toLowerCase());
        
        //Ingredient filter
        let filteredIngredients = [];
        for(let {ingredient} of recipe.ingredients) {
            if(ingredient.toLowerCase().includes(input.value.toLowerCase())) {
                filteredIngredients.push(ingredient);
            }
        }
        const lowerCaseIngredient = filteredIngredients.length > 0;
        if (lowerCaseName | lowerCaseDescription | lowerCaseIngredient) {
            filteredRecipes.push(recipe);
        };
    };
};

//Create ingredients, ustensils and appliances arrays
function createArrays(recipes) {
    var ingredients = [];
    var appliances = [];
    var ustensils = [];
    for (let i = 0; i < recipes.length; i++) {
        if (!appliances.includes(recipes[i].appliance)) appliances.push(recipes[i].appliance);

        for (let ustensil of recipes[i].ustensils) {
            if (!ustensils.includes(ustensil)) ustensils.push(ustensil)
        }

        for (let ingredient of recipes[i].ingredients) {
            if (!ingredients.includes(ingredient.ingredient)) ingredients.push(ingredient.ingredient);
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
    for (let element of elements) {
        const span = document.createElement("span");
        lists[index].appendChild(span);
        span.textContent = element;
    };
};

//filter ingredients/appliances/ustensils
function advancedInputFiltering(ingredients, appliances, ustensils, recipes) {
    for (let input of advancedInput) {
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
    for (let element of elements) {
        const lowerCaseElement = element.toLowerCase().includes(advancedInput[index].value.toLowerCase())
        if (lowerCaseElement) filteredElements.push(element);
    };
    lists[index].innerHTML = "";
    for (let element of filteredElements) {
        const span = document.createElement("span");
        lists[index].appendChild(span);
        span.textContent = element;
    };
};

function createTag(recipes) {
    filteredRecipes = [];
    for (let index = 0; index < lists.length; index++) {
        const spans = lists[index].getElementsByTagName("span");
        for (let i = 0; i < spans.length; i++) {
            spans[i].addEventListener("click", () => {
                const dataType = index;
                const isFound = tags.find(elementTag => elementTag === spans[i].innerHTML);
                if (!isFound) {
                    const tag = document.createElement("span");
                    tag.classList.add(`tag${index}`, "tag");
                    tag.setAttribute("datatype", index)
                    tagSection.appendChild(tag);
                    tag.innerHTML = spans[i].innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>";
                    tags.push(spans[i].innerHTML);

                    //datatypes => 0 = ingredients, 1 = appareils, 2 = ustensils 
                    if (dataType === 0) {
                        for (let recipe of recipes) {
                            for (let ingredient of recipe.ingredients) {
                                if (ingredient.ingredient.includes(spans[i].innerHTML)) filteredRecipes.push(recipe);
                            };
                        };
                    };
                    if (dataType === 1) {
                        for (let recipe of recipes) {
                            if (recipe.appliance.includes(spans[i].innerHTML)) filteredRecipes.push(recipe);
                        };
                    };
                    if (dataType === 2) {
                        for (let recipe of recipes) {
                            if (recipe.ustensils.includes(spans[i].innerHTML)) filteredRecipes.push(recipe);
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

    if (tagSection.innerHTML == "") return;
    else {
        for (let crossTag of crossTags) { 
            crossTag.addEventListener("click", () => {
                crossTag.parentElement.remove();
                
                //filtrage du tableau de tags
                let newTagArray = [];
                for(let i = 0; i <tags.length; i++) {
                    if(tags[i] !== crossTag.parentElement.innerText) newTagArray.push(tags[i])
                }
                tags = newTagArray
                newTagArray = []

                //si après suppression, il n'y a plus de tags alors on récupère toute les recettes puis filtrage avec ce qu'il y a dans l'input
                if (tags.length === 0) {
                    if(input.value.length >= 3) filterWithInputValue(recipes);
                    else filteredRecipes = recipes;
                    createRecipeCard(filteredRecipes);
                    mainInputFiltering(recipes);
                };
                
                //Si il reste des tags alors filtrage des recettes
                if(tags.length >= 1) {
                    if(input.value.length >= 3) filterWithInputValue(recipes)
                    else filteredRecipes = recipes;

                    const tagList = document.querySelectorAll(".tag");

                    for(let tag of tagList) {
                        if(tag.classList.contains("tag0")) {
                            for(let recipe of filteredRecipes) {
                                for(let ingredient of recipe.ingredients) {
                                    if(ingredient.ingredient.includes(tag.innerText)) filteredRecipesWithTags.push(recipe);
                                };
                            };
                        };

                        if(tag.classList.contains("tag1")) {
                            for(let recipe of filteredRecipes) {
                                if(recipe.appliance.includes(tag.innerText)) filteredRecipesWithTags.push(recipe);
                            };
                        };

                        if(tag.classList.contains("tag2")) {
                            for(let recipe of filteredRecipes) {
                                if(recipe.ustensils.includes(tag.innerText)) filteredRecipesWithTags.push(recipe)
                            };
                        };

                        filteredRecipes = filteredRecipesWithTags;
                        filteredRecipesWithTags = [];
                        mainInputFiltering(filteredRecipes);
                        createRecipeCard(filteredRecipes)
                    }
                }
                    
                    //createRecipeCard(filteredRecipes);
                }
            );
        };
    };
};