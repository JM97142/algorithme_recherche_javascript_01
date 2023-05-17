// Importation des recettes depuis le fichier js
import {recipes} from "/data/recipes.js";
import {recipesFactory} from "/scripts/factories/recipes.js";
//
import {ingredientsFactory} from "/scripts/factories/ingredientsFactory.js";
import {appareilsFactory} from "/scripts/factories/appareilsFactory.js";
import {ustensilsFactory} from "/scripts/factories/ustensilsFactory.js";
import {tagsIngredientsFactory} from "/scripts/factories/ingredientsFactory.js";

let searchTerm = '';
let ingredientsSelected = [];
let ustensilsSelected = [];
let appareilsSelected = [];

// Importation des ingrédients
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
    console.log(appareilsSelected);
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

// Fonction recherche principale
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

function onInput(event) {
    searchTerm = event.target.value.toLowerCase();

    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}

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

// AFFICHAGE DATA DES BOUTONS DEROULANTS
async function displayBtn(recipes) {
    let ingredientToDisplay = [];
    let appareilToDisplay = [];
    let ustensilToDisplay = [];

    const inputIngredients = document.querySelector('#searchBtnIngredients');
    const inputAppareils = document.querySelector('#searchBtnAppareils');
    const inputUstensils = document.querySelector('#searchBtnUstensils');

    const divBtnIngredients = document.querySelector('.divBtnIngredients');
    const divBtnAppareils = document.querySelector('.divBtnAppareils');
    const divBtnUstensils = document.querySelector('.divBtnUstensils');

    const tagsSelected = document.querySelector('.tags_selected');

    for (let i=0; i<recipes.length; i++) {
        const ingredients = recipes[i].ingredients;
        for (let j=0; j<ingredients.length; j++) {
            const ingredient = ingredients[j];
            // Supprime les éléments en double
            const findIngredient = ingredientToDisplay.find(ingredientUnique => ingredient === ingredientUnique);

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
                });

                const ingredientsBtnOpen = document.querySelector('.ingredients_btn_open');

                divBtnIngredients.appendChild(ingredientsBtnOpen);

                const ingredientsBtnClose = document.querySelector('.ingredients_btn_close');
                ingredientsBtnClose.addEventListener('click', function() {
                    ingredientsBtnClose.style.display = 'none';
                    inputIngredients.style.display = 'block';
                    divBtnIngredients.style.display = 'flex';
                    ingredientsBtnOpen.style.display = 'block';
                });
            }
        }
    }

    for (let i=0; i<recipes.length; i++) {
        const appareils = recipes[i].appliance.toLowerCase();
        // Supprime les éléments en double
        const findAppareil = appareilToDisplay.find(appareilUnique => appareils === appareilUnique);

            if (findAppareil === undefined) {
                appareilToDisplay.push(appareils);

                const appareilsModel = appareilsFactory(appareils);
                const appareilsCardDOM = appareilsModel();
                divBtnAppareils.appendChild(appareilsCardDOM);

                appareilsCardDOM.addEventListener('click', function() {
                    onAppareilsClick(event, appareils);
                });

                const appareilsBtnOpen = document.querySelector('.appareils_btn_open');
    
                divBtnAppareils.appendChild(appareilsBtnOpen);

                const btnAppareilsClose = document.querySelector('.appareils_btn_close');
                btnAppareilsClose.addEventListener('click', function() {
                    btnAppareilsClose.style.display = 'none';
                    inputAppareils.style.display = 'block';
                    divBtnAppareils.style.display = 'flex';
                    appareilsBtnOpen.style.display = 'block';
                });
            }
    }

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
                });

                const ustensilsBtnOpen = document.querySelector('.ustensils_btn_open');
    
                divBtnUstensils.appendChild(ustensilsBtnOpen);
                
                const btnUstensilsClose = document.querySelector('.ustensils_btn_close');
                btnUstensilsClose.addEventListener('click', function() {
                    btnUstensilsClose.style.display = 'none';
                    inputUstensils.style.display = 'block';
                    divBtnUstensils.style.display = 'flex';
                    ustensilsBtnOpen.style.display = 'block';
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