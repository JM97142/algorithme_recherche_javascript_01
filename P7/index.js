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
let recipesDisplayed = [];

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
    displayRecipes(recipeToDisplay);
}

// EVENTS
function onInput(event) {
    searchTerm = event.target.value.toLowerCase();

    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}
function onSearchIngredient(event) {
    const ingredientsToDisplay = [];
    const searchTermIngredients = event.target.value.toLowerCase();

    const ingredientsDisplayed = getIngredientsForRecipes(recipesDisplayed);

    for (let i=0; i<ingredientsDisplayed.length; i++) {
        const ingredient = ingredientsDisplayed[i];
        const ingredientName = ingredient.ingredient.toLowerCase();
        
        if (ingredientName.includes(searchTermIngredients)) {
            ingredientsToDisplay.push(ingredient);
        }
    }
    displayIngredients(ingredientsToDisplay);
}
function onSearchAppareil(event) {
    const appareilsToDisplay = [];
    const searchTermAppareils = event.target.value.toLowerCase();

    const appareilsDisplayed = getAppareilsForRecipes(recipesDisplayed);
    for (let i=0; i<appareilsDisplayed.length; i++) {
        const appareil = appareilsDisplayed[i].toLowerCase();
        
        if (appareil.includes(searchTermAppareils)) {
            appareilsToDisplay.push(appareil);
        }
    }
    displayAppareils(appareilsToDisplay);
}
function onSearchUstensil(event) {
    const ustensilsToDisplay = [];
    const searchTermUstensils = event.target.value.toLowerCase();

    const ustensilsDisplayed = getUstensilsForRecipes(recipesDisplayed);

    for (let i=0; i<ustensilsDisplayed.length; i++) {
        const ustensil = ustensilsDisplayed[i].toLowerCase();
        console.log(ustensil);
        if (ustensil.includes(searchTermUstensils)) {
            ustensilsToDisplay.push(ustensil);
        }
    }
    displayUstensils(ustensilsToDisplay);
}
// CREATION/FONCTIONNEMENT TAGS
// Tags ingredients
function createIngredientTag(ingredient) {
    const tagsSelected = document.querySelector('.tags_selected');

    const tagsIngredientsModel = tagsIngredientsFactory(ingredient);
    const tagsIngredientsCardDOM = tagsIngredientsModel();
    tagsSelected.appendChild(tagsIngredientsCardDOM);

    tagsIngredientsCardDOM.addEventListener('click', () => onRemoveIngredientTag(ingredient.ingredient));
}

function onRemoveIngredientTag(ingredientName) {
    ingredientsSelected = ingredientsSelected.filter(ingredientSelected => ingredientSelected !== ingredientName);

    const tag = document.getElementById(ingredientName);
    tag.remove();

    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}

function onIngredientsClick(event, ingredient) {
    ingredientsSelected.push(ingredient.ingredient.toLowerCase());
    
    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);

    createIngredientTag(ingredient);
}

function createIngredientInDropdown(ingredient) {
    const divBtnIngredients = document.querySelector('.divBtnIngredients');

    const ingredientsModel = ingredientsFactory(ingredient);
    const ingredientsCardDOM = ingredientsModel();
    divBtnIngredients.appendChild(ingredientsCardDOM);

    ingredientsCardDOM.addEventListener('click', (event) => onIngredientsClick(event, ingredient));

    const ingredientsBtnOpen = document.querySelector('.ingredients_btn_open');
    divBtnIngredients.appendChild(ingredientsBtnOpen);
}
function displayIngredients(ingredients) {
    const divBtnIngredients = document.querySelector('.divBtnIngredients');
    divBtnIngredients.innerHTML = '';

    for (let i=0; i<ingredients.length; i++) {
        const ingredient = ingredients[i];
        createIngredientInDropdown(ingredient);
    }
}
// Tags appareils
function createAppareilTag(appareil) {
    const tagsSelected = document.querySelector('.tags_selected');

    const tagAppareilsModel = tagsAppareilsFactory(appareil);
    const tagsAppareilsCardDOM = tagAppareilsModel();
    tagsSelected.appendChild(tagsAppareilsCardDOM);
    
    tagsAppareilsCardDOM.addEventListener('click', () => onRemoveAppareilTag(appareil));
}
function onRemoveAppareilTag(appareilName) {
    appareilsSelected = appareilsSelected.filter(appareilSelected => appareilSelected !== appareilName);

    const tag = document.getElementById(appareilName);
    tag.remove();

    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}
function onAppareilsClick(event, appareil) {
    appareilsSelected.push(appareil.toLowerCase());
    
    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);

    createAppareilTag(appareil);
}

function createAppareilInDropdown(appareil) {
    const divBtnAppareils = document.querySelector('.divBtnAppareils');

    const appareilsModel = appareilsFactory(appareil);
    const appareilsCardDOM = appareilsModel();
    divBtnAppareils.appendChild(appareilsCardDOM);

    appareilsCardDOM.addEventListener('click', (event) => onAppareilsClick(event, appareil));

    const appareilsBtnOpen = document.querySelector('.appareils_btn_open');
    divBtnAppareils.appendChild(appareilsBtnOpen);
}
function displayAppareils(appliance) {
    const divBtnAppareils = document.querySelector('.divBtnAppareils');
    divBtnAppareils.innerHTML = '';

    for (let i=0; i<appliance.length; i++) {
        const appareil = appliance[i];
        createAppareilInDropdown(appareil);
    }
}
// Tags Ustensil
function createUstensilTag(ustensil) {
    const tagsSelected = document.querySelector('.tags_selected');

    const tagsUstensilsModel = tagsUstensilsFactory(ustensil);
    const tagsUstensilsCardDOM = tagsUstensilsModel();
    tagsSelected.appendChild(tagsUstensilsCardDOM);

    tagsUstensilsCardDOM.addEventListener('click', () => onRemoveUstensilTag(ustensil));
}
function onRemoveUstensilTag(ustensilName) {
    ustensilsSelected = ustensilsSelected.filter(ustensilSelected => ustensilSelected !== ustensilName);

    const tag = document.getElementById(ustensilName);
    tag.remove();

    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}
function onUstensilsClick(event, ustensil) {
    ustensilsSelected.push(ustensil.toLowerCase());
    
    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);

    createUstensilTag(ustensil);
}

function createUstensilInDropdown(ustensil) {
    const divBtnUstensils = document.querySelector('.divBtnUstensils');

    const ustensilsModel = ustensilsFactory(ustensil);
    const ustensilsCardDOM = ustensilsModel();
    divBtnUstensils.appendChild(ustensilsCardDOM);

    ustensilsCardDOM.addEventListener('click', (event) => onUstensilsClick(event, ustensil));

    const ustensilsBtnOpen = document.querySelector('.ustensils_btn_open');
    divBtnUstensils.appendChild(ustensilsBtnOpen);
}
function displayUstensils(ustensils) {
    const divBtnUstensils = document.querySelector('.divBtnUstensils');
    divBtnUstensils.innerHTML = '';

    for (let i=0; i<ustensils.length; i++) {
        const ustensil = ustensils[i];
        createUstensilInDropdown(ustensil);
    }
}

function getIngredientsForRecipes() {
    let ingredientToDisplay = [];

    for (let i=0; i<recipes.length; i++) {
        const ingredients = recipes[i].ingredients;
        for (let j=0; j<ingredients.length; j++) {
            const ingredient = ingredients[j];
            // Supprime les éléments en double
            const isIngredientAlreadyDisplayed = ingredientToDisplay.find(ingredientUnique => ingredient.ingredient.toLowerCase() === ingredientUnique.ingredient.toLowerCase());
            const isIngredientAlreadySelected = ingredientToDisplay.includes(ingredient);

            if (isIngredientAlreadyDisplayed === undefined && isIngredientAlreadySelected === false) {
                ingredientToDisplay.push(ingredient);
            }
        }
    }
    return ingredientToDisplay;
}

function getAppareilsForRecipes() {
    let appareilToDisplay = [];

    for (let i=0; i<recipes.length; i++) {
        const appareil = recipes[i].appliance.toLowerCase();
        // Supprime les éléments en double
        const isAppareilAlreadyDisplayed = appareilToDisplay.find(appareilUnique => appareil === appareilUnique);
        const isAppareilAlreadySelected = appareilToDisplay.includes(appareil);

            if (isAppareilAlreadyDisplayed === undefined && isAppareilAlreadySelected === false) {
                appareilToDisplay.push(appareil);
            }
    }
    return appareilToDisplay;
}

function getUstensilsForRecipes() {
    let ustensilToDisplay = [];

    for (let i=0; i<recipes.length; i++) {
        const ustensils = recipes[i].ustensils;
        for (let j=0; j<ustensils.length; j++) {
            const ustensil = ustensils[j].toLowerCase();
            // Supprime les éléments en double
            const findUstensil = ustensilToDisplay.find(ustensilUnique => ustensil === ustensilUnique);

            if (findUstensil === undefined) {
                ustensilToDisplay.push(ustensil);
            }
        }
    }
    return ustensilToDisplay;
}

// AFFICHAGE DATA BOUTONS DEROULANTS
async function displayBtn(recipes) {
    // Affichage ingrédients des recettes
    const ingredients = getIngredientsForRecipes(recipes);
    displayIngredients(ingredients);
    // Affichage appareils des recettes
    const appareils = getAppareilsForRecipes(recipes);
    displayAppareils(appareils);
    // Affichage ustensiles des recettes
    const ustensils = getUstensilsForRecipes(recipes);
    displayUstensils(ustensils);
}

function initIngredientsDropdown() {
    const btnIngredients = document.querySelector('.btnSearchIngredients');
    const divBtnIngredients = document.querySelector('.divBtnIngredients');

    const ingredientsBtnClose = document.querySelector('.ingredients_btn_close');
    ingredientsBtnClose.addEventListener('click', function() {
        ingredientsBtnClose.style.display = 'none';
        btnIngredients.style.display = 'flex';
        divBtnIngredients.style.display = 'flex';
    });
    const closeListIngredients = document.querySelector('.close-ingredients');
    closeListIngredients.addEventListener('click', function() {
        ingredientsBtnClose.style.display = 'flex';
        btnIngredients.style.display = 'none';
        divBtnIngredients.style.display = 'none';
    });
}
function initAppareilsDropdown() {
    const btnAppareils = document.querySelector('.btnSearchAppareils');
    const divBtnAppareils = document.querySelector('.divBtnAppareils');

    const btnAppareilsClose = document.querySelector('.appareils_btn_close');
    btnAppareilsClose.addEventListener('click', function() {
        btnAppareilsClose.style.display = 'none';
        btnAppareils.style.display = 'flex';
        divBtnAppareils.style.display = 'flex';
    });
    const closeListAppareils = document.querySelector('.close-appareils');
    closeListAppareils.addEventListener('click', function() {
        btnAppareilsClose.style.display = 'flex';
        btnAppareils.style.display = 'none';
        divBtnAppareils.style.display = 'none';
    });
}
function initUstensilsDropdown() {
    const btnUstensils = document.querySelector('.btnSearchUstensils');
    const divBtnUstensils = document.querySelector('.divBtnUstensils');

    const btnUstensilsClose = document.querySelector('.ustensils_btn_close');
    btnUstensilsClose.addEventListener('click', function() {
        btnUstensilsClose.style.display = 'none';
        btnUstensils.style.display = 'flex';
        divBtnUstensils.style.display = 'flex';
    });
    const closeListUstensils = document.querySelector('.close-ustensils');
    closeListUstensils.addEventListener('click', function() {
        btnUstensilsClose.style.display = 'flex';
        btnUstensils.style.display = 'none';
        divBtnUstensils.style.display = 'none';
    });
}

function initDropdowns() {
    initIngredientsDropdown();
    initAppareilsDropdown();
    initUstensilsDropdown();
}

async function init() {
    initDropdowns();
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
inputIngredients.addEventListener('input', onSearchIngredient);

const inputAppareils = document.querySelector('#inputAppareils');
inputAppareils.addEventListener('input', onSearchAppareil);

const inputUstensils = document.querySelector('#inputUstensils');
inputUstensils.addEventListener('input', onSearchUstensil);