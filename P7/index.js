// Importation des recettes depuis le fichier js
import {recipes} from "/data/recipes.js";
import {recipesFactory} from "/scripts/factories/recipes.js";
//
import {ingredientsFactory} from "/scripts/factories/ingredientsFactory.js";
import {appareilsFactory} from "/scripts/factories/appareilsFactory.js";
import {ustensilsFactory} from "/scripts/factories/ustensilsFactory.js";

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

// FONCTIONNEMENT RECHERCHE

async function isRecipeValidForSearch(recipe) {
        const recipeName = recipe.name;
        const recipeIngredients = recipe.ingredients;
        const recipeDescriptions = recipe.description;
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
                    const recipeIngredient = recipeIngredients[j].ingredient;
                    if (recipeIngredient.includes(searchTerm)) {
                        return true;
                    }
                }
            }
        }
        else if (searchTerm.length === 0) {
            return true;
        }
        return false;
}

async function getRecipesForSearch(recipes) {

    let recipeToDisplay = [];

    for (let i=0; i<recipes.length; i++) {
        const recipe = recipes[i];

        const isValid = isRecipeValidForSearch(recipe);

        if (isValid === true) {
            recipeToDisplay.push(recipe);
        }
    }
    displayRecipes(recipeToDisplay);
}

async function onInput(event) {
    searchTerm = event.target.value.toLowerCase();

    getRecipesForSearch(searchTerm);
}

async function onIngredientsClick(event, ingredient) {
    ingredient = event.target.innerHTML.toLowerCase();

    ingredientsSelected.push(ingredient);
    
    getRecipesForSearch(ingredientsSelected);
}

async function onUstensilsClick(event, ustensil) {
    ustensil = event.target.innerHTML.toLowerCase();

    ustensilsSelected.push(ustensil);

    getRecipesForSearch(ustensilsSelected);
}

async function onAppareilsClick(event, appareil) {
    appareil = event.target.innerHTML.toLowerCase();

    appareilsSelected.push(appareil);

    getRecipesForSearch(appareilsSelected);
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
    divBtnIngredients.innerHTML = '';
    const divBtnAppareils = document.querySelector('.divBtnAppareils');
    const divBtnUstensils = document.querySelector('.divBtnUstensils');

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

                ingredientsCardDOM.addEventListener('click', onIngredientsClick);

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
        const appareils = recipes[i].appliance;
        // Supprime les éléments en double
        const findAppareil = appareilToDisplay.find(appareilUnique => appareils === appareilUnique);

            if (findAppareil === undefined) {
                appareilToDisplay.push(appareils);

                const appareilsModel = appareilsFactory(appareils);
                const appareilsCardDOM = appareilsModel();
                divBtnAppareils.appendChild(appareilsCardDOM);

                appareilsCardDOM.addEventListener('click', onAppareilsClick);

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
            const ustensil = ustensils[j];
            // Supprime les éléments en double
            const findUstensil = ustensilToDisplay.find(ustensilUnique => ustensil === ustensilUnique);

            if (findUstensil === undefined) {
                ustensilToDisplay.push(ustensil);
                
                const ustensilsModel = ustensilsFactory(ustensil);
                const ustensilsCardDOM = ustensilsModel();
                divBtnAppareils.appendChild(ustensilsCardDOM);

                ustensilsCardDOM.addEventListener('click', onUstensilsClick);

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
    getRecipesForSearch(recipes);
    // Affiche data des boutons
    displayBtn(recipes);
}

init();

// EVENT LISTERNER
const searchBar = document.querySelector("#site-search");
searchBar.addEventListener('input', onInput);

// const inputIngredients = document.querySelector('#searchBtnIngredients');
// inputIngredients.addEventListener('input', onIngredientsClick);

// const inputAppareils = document.querySelector('#searchBtnAppareils');
// inputAppareils.addEventListener('input', onAppareilsClick);

// const inputUstensils = document.querySelector('#searchBtnUstensils');
// inputUstensils.addEventListener('input', onUstensilsClick);