// DATA RECETTES js
import {recipes} from "/data/recipes.js";

// FACTORIES
import {recipesFactory} from "/scripts/factories/recipesFactory.js";
import {ingredientsFactory} from "/scripts/factories/ingredientsFactory.js";
import {appareilsFactory} from "/scripts/factories/appareilsFactory.js";
import {ustensilsFactory} from "/scripts/factories/ustensilsFactory.js";
import {tagsIngredientsFactory} from "/scripts/factories/ingredientsFactory.js";
import {tagsAppareilsFactory} from "./scripts/factories/appareilsFactory.js";
import {tagsUstensilsFactory} from "./scripts/factories/ustensilsFactory.js";

let searchTerm = '';
let ingredientsSelected = [];
let ustensilsSelected = [];
let appareilsSelected = [];

// IMPORTATION DES RECETTES
async function displayRecipes(recipes) {
    const recipesSection = document.querySelector(".fiches_recipes");
    recipesSection.innerHTML = '';

    recipes.forEach((recipe) => {
        const recipeModel = recipesFactory(recipe);
        const recipeCardDOM = recipeModel();
        recipesSection.appendChild(recipeCardDOM);
    });
}

// FONCTIONNEMENT BARRE DE RECHERCHE
function isRecipeValidForSearch(recipe, searchTerm) {
        const recipeName = recipe.name.toLowerCase();
        const recipeIngredients = recipe.ingredients;
        const recipeDescriptions = recipe.description.toLowerCase();
        // Cas recherche nom
        if (searchTerm.length >= 3) {
            if (recipeName.includes(searchTerm)){
                return true;
            }
            // Cas recherche description
            else if (recipeDescriptions.includes(searchTerm)) {
                return true;
            }
            // Cas recherche ingrédients
            else {
                for (let j=0; j<recipeIngredients.length; j++) {
                    const recipeIngredient = recipeIngredients[j].ingredient.toLowerCase();
                    if (recipeIngredient.includes(searchTerm)) {
                        return true;
                    }
                }
            }
            return false;
        }
        return true;
}

// FONCTIONNEMENT TAGS
function isTagIngredientValidForSearch(recipeIngredients, searchTerm) {
    // Cas recherche nom
    if (searchTerm.length >= 3) {
        for (let j=0; j<recipeIngredients.length; j++) {
            const recipeIngredient = recipeIngredients[j].ingredient.toLowerCase();
            if (recipeIngredient.includes(searchTerm)) {
                return true;
            }
        }
        return false;
    }
    return true;

}

// RECHERCHE PAR TAGS
// Tags ingrédients
function isRecipeValidForIngredients(recipeIngredients, ingredientsSelected) {
    let counter = 0;

    for (let j=0; j<recipeIngredients.length; j++) {
        const recipeIngredient = recipeIngredients[j].ingredient.toLowerCase();

        if (ingredientsSelected.includes(recipeIngredient)) {
            counter = counter + 1;
        }
    }
    if (counter === ingredientsSelected.length) {
        return true;
    }
    return false;
}
// Tags Appareils
function isRecipeValidForAppareils(recipeAppareils, appareilsSelected) {
    let counter = 0;
    
    const recipeAppareil = recipeAppareils.toLowerCase();
    
    if (appareilsSelected.includes(recipeAppareil)) {
        counter = counter + 1;
    }
    if (counter === appareilsSelected.length) {
        return true;
    }
    return false;
}
// Tags ustensils
function isRecipeValideForUstensils(recipeUstensils, ustensilsSelected) {
    let counter = 0;

    for (let j=0; j<recipeUstensils.length; j++) {
        const recipeUstensil = recipeUstensils[j].toLowerCase();

        if (ustensilsSelected.includes(recipeUstensil)) {
            counter = counter + 1;
        }
    }
    if (counter === ustensilsSelected.length) {
        return true;
    }
    return false;
}

// FONCTION RECHERCHE GLOBALE
function getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected) {

    let recipeToDisplay = [];

    for (let i=0; i<recipes.length; i++) {
        const recipe = recipes[i];
        const recipeIngredients = recipe.ingredients;
        const recipeAppareils = recipe.appliance;
        const recipeUstensils = recipe.ustensils;

        const isValid = isRecipeValidForSearch(recipe, searchTerm);
        const isIngredientValid = isRecipeValidForIngredients(recipeIngredients, ingredientsSelected);
        const isAppareilValid = isRecipeValidForAppareils(recipeAppareils, appareilsSelected);
        const isUstensilValid = isRecipeValideForUstensils(recipeUstensils, ustensilsSelected);
        
        if (isValid && isIngredientValid && isAppareilValid && isUstensilValid) {
            recipeToDisplay.push(recipe);
        }
    }
    console.log('recipe', recipeToDisplay);
    displayRecipes(recipeToDisplay);
}
// FONCTION RECHERCHE TAGS
function getTagForSearch(searchTerm) {
    let ingredientToDisplay = [];

    for  (let i=0; i<recipes.length; i++) {
        const recipe = recipes[i];
        const recipeIngredients = recipe.ingredients

        const isIngredientValid = isTagIngredientValidForSearch(recipeIngredients, searchTerm);

        if (isIngredientValid) {
            ingredientToDisplay.push(recipeIngredients);
        }
    }
    displayBtn(ingredientToDisplay);
}

// EVENTS
function onInput(event) {
    searchTerm = event.target.value.toLowerCase();

    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}
function onTag(event) {
    searchTerm = event.target.value.toLowerCase();

    getTagForSearch(searchTerm);
}
// CLICS TAGS
function onIngredientsClick(event, ingredient) {
    ingredient = event.target.innerHTML.toLowerCase();
    
    ingredientsSelected.push(ingredient);
    
    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}

function onAppareilsClick(event, appareil) {
    appareil = event.target.innerHTML.toLowerCase();

    appareilsSelected.push(appareil);
    
    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}

function onUstensilsClick(event, ustensil) {
    ustensil = event.target.innerHTML.toLowerCase();

    ustensilsSelected.push(ustensil);
    
    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}

// AFFICHAGE DATA BOUTONS DEROULANTS
async function displayBtn(recipes) {
    let ingredientToDisplay = [];
    let appareilToDisplay = [];
    let ustensilToDisplay = [];

    const btnIngredients = document.querySelector('.btnSearchIngredients');
    const btnAppareils = document.querySelector('.btnSearchAppareils');
    const btnUstensils = document.querySelector('.btnSearchUstensils');

    const divBtnIngredients = document.querySelector('.divBtnIngredients');
    const divBtnAppareils = document.querySelector('.divBtnAppareils');
    const divBtnUstensils = document.querySelector('.divBtnUstensils');

    const tagsSelected = document.querySelector('.tags_selected');
    // Affichage ingrédients des recettes
    for (let i=0; i<recipes.length; i++) {
        const ingredients = recipes[i].ingredients;
        for (let j=0; j<ingredients.length; j++) {
            const ingredient = ingredients[j];
            // Supprime les éléments en double
            const findIngredient = ingredientToDisplay.find(
                ingredientUnique => ingredient.ingredient.toLowerCase() === ingredientUnique.ingredient.toLowerCase()
            );

            if (findIngredient === undefined) {
                ingredientToDisplay.push(ingredient);

                const ingredientsModel = ingredientsFactory(ingredient);
                const ingredientsCardDOM = ingredientsModel();
                divBtnIngredients.appendChild(ingredientsCardDOM);

                ingredientsCardDOM.addEventListener('click', function() {
                    onIngredientsClick(event, ingredient);

                    const tagsIngredientsModel = tagsIngredientsFactory(ingredient);
                    const tagsIngredientsCardDOM = tagsIngredientsModel();
                    tagsSelected.appendChild(tagsIngredientsCardDOM);

                    tagsIngredientsCardDOM.addEventListener('click', function() {
                        tagsIngredientsCardDOM.remove();
                    })
                });

                const ingredientsBtnOpen = document.querySelector('.ingredients_btn_open');
                divBtnIngredients.appendChild(ingredientsBtnOpen);

                const ingredientsBtnClose = document.querySelector('.ingredients_btn_close');
                ingredientsBtnClose.addEventListener('click', function() {
                    ingredientsBtnClose.style.display = 'none';
                    btnIngredients.style.display = 'flex';
                    divBtnIngredients.style.display = 'flex';
                    ingredientsBtnOpen.style.display = 'flex';
                });
                const closeListIngredients = document.querySelector('.close-ingredients');
                closeListIngredients.addEventListener('click', function() {
                    ingredientsBtnClose.style.display = 'flex';
                    btnIngredients.style.display = 'none';
                    divBtnIngredients.style.display = 'none';
                    ingredientsBtnOpen.style.display = 'none';
                });
            }
        }
    }
    // Affichage appareils des recettes
    for (let i=0; i<recipes.length; i++) {
        const appareil = recipes[i].appliance.toLowerCase();
        // Supprime les éléments en double
        const findAppareil = appareilToDisplay.find(appareilUnique => appareil === appareilUnique);

            if (findAppareil === undefined) {
                appareilToDisplay.push(appareil);

                const appareilsModel = appareilsFactory(appareil);
                const appareilsCardDOM = appareilsModel();
                divBtnAppareils.appendChild(appareilsCardDOM);

                appareilsCardDOM.addEventListener('click', function() {
                    onAppareilsClick(event, appareil);
                    
                    const tagAppareilsModel = tagsAppareilsFactory(appareil);
                    const tagsAppareilsCardDOM = tagAppareilsModel();
                    tagsSelected.appendChild(tagsAppareilsCardDOM);

                    const findTag = appareilToDisplay.filter(appareilUnique => appareil === appareilUnique);
                    console.log(findTag)

                    if (findTag === false) {
                        appareilToDisplay.push(appareil);
                        console.log(appareilToDisplay);
                    }
                    
                    tagsAppareilsCardDOM.addEventListener('click', function() {
                        tagsAppareilsCardDOM.remove();
                    });
                });

                const appareilsBtnOpen = document.querySelector('.appareils_btn_open');
                divBtnAppareils.appendChild(appareilsBtnOpen);

                const btnAppareilsClose = document.querySelector('.appareils_btn_close');
                btnAppareilsClose.addEventListener('click', function() {
                    btnAppareilsClose.style.display = 'none';
                    btnAppareils.style.display = 'flex';
                    divBtnAppareils.style.display = 'flex';
                    appareilsBtnOpen.style.display = 'flex';
                });
                const closeListAppareils = document.querySelector('.close-appareils');
                closeListAppareils.addEventListener('click', function() {
                    btnAppareilsClose.style.display = 'flex';
                    btnAppareils.style.display = 'none';
                    divBtnAppareils.style.display = 'none';
                    appareilsBtnOpen.style.display = 'none';
                });
            }
    }
    // Affichage ustensiles des recettes
    for (let i=0; i<recipes.length; i++) {
        const ustensils = recipes[i].ustensils;
        for (let j=0; j<ustensils.length; j++) {
            const ustensil = ustensils[j].toLowerCase();
            // Supprime les éléments en double
            const findUstensil = ustensilToDisplay.find(ustensilUnique => ustensil === ustensilUnique);

            if (findUstensil === undefined) {
                ustensilToDisplay.push(ustensil);
                
                const ustensilsModel = ustensilsFactory(ustensil);
                const ustensilsCardDOM = ustensilsModel();
                divBtnAppareils.appendChild(ustensilsCardDOM);

                ustensilsCardDOM.addEventListener('click', function() {
                    onUstensilsClick(event, ustensil);

                    const tagsUstensilsModel = tagsUstensilsFactory(ustensil);
                    const tagsUstensilsCardDOM = tagsUstensilsModel();
                    tagsSelected.appendChild(tagsUstensilsCardDOM);

                    tagsUstensilsCardDOM.addEventListener('click', function() {
                        tagsUstensilsCardDOM.remove();
                    })
                });

                const ustensilsBtnOpen = document.querySelector('.ustensils_btn_open');
                divBtnUstensils.appendChild(ustensilsBtnOpen);
                
                const btnUstensilsClose = document.querySelector('.ustensils_btn_close');
                btnUstensilsClose.addEventListener('click', function() {
                    btnUstensilsClose.style.display = 'none';
                    btnUstensils.style.display = 'flex';
                    divBtnUstensils.style.display = 'flex';
                    ustensilsBtnOpen.style.display = 'flex';
                });
                const closeListUstensils = document.querySelector('.close-ustensils');
                closeListUstensils.addEventListener('click', function() {
                    btnUstensilsClose.style.display = 'flex';
                    btnUstensils.style.display = 'none';
                    divBtnUstensils.style.display = 'none';
                    ustensilsBtnOpen.style.display = 'none';
                });
            }
        }
    }
}


async function init() {
    // Affiche les recettes
    displayRecipes(recipes);
    // Fonctionnement recherche
    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
    // Affiche data des boutons
    displayBtn(recipes);
}

init();

// EVENT LISTERNER
const searchBar = document.querySelector("#site-search");
searchBar.addEventListener('input', onInput);

const inputIngredients = document.querySelector('#inputIngredients');
inputIngredients.addEventListener('input', onTag);