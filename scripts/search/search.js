let tags = [];
let filteredRecipes = [];

//Filtering with main input
function mainInputFiltering(recipes) {
    input.addEventListener("input", () => {
        if (input.value.length < 3) {
            filteredRecipes = recipes;
            createRecipeCard(recipes);
            return filteredRecipes;
        }   else {
                filterWithInputValue(recipes);
                if (!filteredRecipes.length > 0) recipeSection.innerHTML = "<span class='error'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</span>";
                else createRecipeCard(filteredRecipes);
            return filteredRecipes;
        }
    });
};

function filterWithInputValue(recipes) {
    filteredRecipes = recipes.filter((recipe) => {
        const lowerCaseName = recipe.name.toLowerCase().includes(input.value.toLowerCase());
        const lowerCaseDescription = recipe.description.toLowerCase().includes(input.value.toLowerCase());
        const lowerCaseIngredients = recipe.ingredients.filter(({ ingredient }) =>ingredient.toLowerCase().includes(input.value.toLowerCase())).length > 0;
        return lowerCaseIngredients | lowerCaseName | lowerCaseDescription;
    });
};

//Create ingredients, ustensils and appliances arrays
function createArrays(recipes) {
    var ingredients = [];
    var appliances = [];
    var ustensils = [];
    recipes.forEach((recipe) => {
        if (!appliances.includes(recipe.appliance)) appliances.push(recipe.appliance);

        recipe.ustensils.forEach((ustensil) => {
            if (!ustensils.includes(ustensil)) ustensils.push(ustensil);
        });

        recipe.ingredients.forEach((ingredient) => {
            if (!ingredients.includes(ingredient.ingredient)) ingredients.push(ingredient.ingredient);
        });
    });
    attributeItems(ingredients, 0);
    attributeItems(appliances, 1);
    attributeItems(ustensils, 2);
    createTag(recipes);
    advancedInputFiltering(ingredients, appliances, ustensils, recipes);
    return {
        ingredients: [...ingredients],
        appliances: [...appliances],
        ustensils: [...ustensils],
    };
};

//fill lists with ingredients ustensils and appliances
function attributeItems(elements, index) {
    lists[index].innerHTML = "";
    elements.forEach((element) => {
        const span = document.createElement("span");
        span.classList.add("span");
        lists[index].appendChild(span);
        span.textContent = element;
    });
};

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
    const filteredElement = elements.filter((element) => {
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
    if (dataType === 0) {
        filteredRecipes = [];
        return filteredRecipes = recipes.filter((recipe) =>
            recipe.ingredients.some(({ ingredient }) => ingredient.includes(span.innerHTML))
        );
    };
    if (dataType === 1) {
        return filteredRecipes = recipes.filter((recipe) => recipe.appliance.includes(span.innerHTML));
    };
    if (dataType === 2) {
        return filteredRecipes = recipes.filter((recipe) =>recipe.ustensils.includes(span.innerHTML));
    };
};

//create tag and filter recipes
function createTag(recipes) {
    lists.forEach((list, index) => {
        const spans = Array.from(list.getElementsByTagName("span"));
        spans.forEach((span) => {
            span.addEventListener("click", () => {
                const dataType = index;
                const isFound = tags.find((elementTag) => elementTag === span.innerHTML);
                if (!isFound) {
                    const tag = document.createElement("span");
                    tag.classList.add(`tag${index}`, "tag");
                    tag.setAttribute("datatype", dataType);
                    tagSection.appendChild(tag);
                    tag.innerHTML = span.innerHTML + "<i class='fa-solid fa-xmark delete-tag'></i>";
                    tags.push(span.innerHTML);
                    datatypeFilter(span, dataType, recipes);
                }   else return;
                mainInputFiltering(recipes);
                createRecipeCard(filteredRecipes);
                deleteTag();
            });
        });
    });
};

async function deleteTag() {
    const { recipes } = await getRecipes();
    const crossTags = document.querySelectorAll(".delete-tag"); //Croix pour suppression de tags

    if (tagSection.innerHTML == "") return;
    else {
        crossTags.forEach((crossTag) => {
            crossTag.addEventListener("click", () => {
                crossTag.parentElement.remove();

                //Filtrage des tags
                tags = tags.filter((elementTag) => {
                    return elementTag != crossTag.parentElement.innerText;
                });

                filteredRecipes = recipes;

                //si il reste des tags alors filtrage des recettes avec la valeur de l'input
                if (tags.length === 0) {
                    filterWithInputValue(recipes);
                    mainInputFiltering(recipes);
                };

                //Si il reste des tags alors filtrage de recettes
                if (tags.length >= 1) {
                    filterByTag();
                    let postFilterData = filteredRecipes
                    if(input.value.length >= 3) {
                        filterWithInputValue(postFilterData)
                        mainInputFiltering(postFilterData);
                    };
                };
                createRecipeCard(filteredRecipes);
            });
        });
    };
};

function filterByTag() {
    const tagList = document.querySelectorAll(".tag");

    tagList.forEach(tag => {
        if (tag.classList.contains("tag0")) {
            return filteredRecipes = filteredRecipes.filter((recipe) =>
                recipe.ingredients.some(({ ingredient }) => ingredient.includes(tag.innerText)));
        };

        if (tag.classList.contains("tag1")) {
            return filteredRecipes = filteredRecipes.filter((recipe) => recipe.appliance.includes(tag.innerText));
        };

        if (tag.classList.contains("tag2")) {
            return filteredRecipes = filteredRecipes.filter((recipe) => recipe.ustensils.includes(tag.innerText));
        };
    });
};