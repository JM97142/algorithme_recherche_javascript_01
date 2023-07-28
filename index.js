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

    if (recipes.length === 0) {
        recipesSection.innerHTML = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    }
    else {
        recipes.forEach((recipe) => {
            const recipeModel = recipesFactory(recipe);
            const recipeCardDOM = recipeModel();
            recipesSection.appendChild(recipeCardDOM);
        });
    }
}

// FONCTIONNEMENT BARRE DE RECHERCHE
function isRecipeValidForSearch(recipe, searchTerm) {
        const recipeName = recipe.name.toLowerCase();
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
                const foundIngredient = recipe.ingredients.find(recipeIngredient => recipeIngredient.ingredient.toLowerCase().includes(searchTerm));
                if (foundIngredient !== undefined) {
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

    const foundIngredients = recipeIngredients.filter(recipeIngredient => ingredientsSelected.includes(recipeIngredient.ingredient));

    if (foundIngredients.length === ingredientsSelected.length) {
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
    
    const foundUstensils = recipeUstensils.filter(recipeUstensil => ustensilsSelected.includes(recipeUstensil.toLowerCase()));

    if (foundUstensils.length === ustensilsSelected.length) {
        return true;
    }
    return false;
}

// FONCTION RECHERCHE GLOBALE
function getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected) {

    const recipeToDisplay = recipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients;
        const recipeAppareils = recipe.appliance;
        const recipeUstensils = recipe.ustensils;

        const isValid = isRecipeValidForSearch(recipe, searchTerm);
        const isIngredientValid = isRecipeValidForIngredients(recipeIngredients, ingredientsSelected);
        const isAppareilValid = isRecipeValidForAppareils(recipeAppareils, appareilsSelected);
        const isUstensilValid = isRecipeValideForUstensils(recipeUstensils, ustensilsSelected);
        
        return (isValid && isIngredientValid && isAppareilValid && isUstensilValid);
    });
    displayRecipes(recipeToDisplay);
}

// EVENTS
function onInput(event) {
    searchTerm = event.target.value.toLowerCase();

    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);
}
function onSearchIngredient(event) {
    const searchTermIngredients = event.target.value.toLowerCase();

    const ingredientsDisplayed = getIngredientsForRecipes(recipesDisplayed);

    const ingredientsToDisplay = ingredientsDisplayed.filter(ingredient => ingredient.ingredient.toLowerCase().includes(searchTermIngredients));
    
    displayIngredients(ingredientsToDisplay);
}
function onSearchAppareil(event) {
    const searchTermAppareils = event.target.value.toLowerCase();

    const appareilsDisplayed = getAppareilsForRecipes(recipesDisplayed);

    const appareilsToDisplay = appareilsDisplayed.filter(appareil => appareil.toLowerCase().includes(searchTermAppareils));

    displayAppareils(appareilsToDisplay);
}
function onSearchUstensil(event) {
    const searchTermUstensils = event.target.value.toLowerCase();

    const ustensilsDisplayed = getUstensilsForRecipes(recipesDisplayed);

    const ustensilsToDisplay = ustensilsDisplayed.filter(ustensil => ustensil.toLowerCase().includes(searchTermUstensils));

    displayUstensils(ustensilsToDisplay);
}

// CREATION/FONCTIONNEMENT TAGS
// TAGS INGREDIENTS
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
    ingredientsSelected.push(ingredient.ingredient);
    
    getRecipesForSearch(searchTerm, ingredientsSelected, appareilsSelected, ustensilsSelected);

    createIngredientTag(ingredient);
}
function createIngredientInDropdown(ingredient) {
    const ingredientsContenair = document.querySelector('.ingredients_contenair');

    const ingredientsModel = ingredientsFactory(ingredient);
    const ingredientsCardDOM = ingredientsModel();
    ingredientsContenair.appendChild(ingredientsCardDOM);

    ingredientsCardDOM.addEventListener('click', (event) => onIngredientsClick(event, ingredient));

    const ingredientsBtnOpen = document.querySelector('.list_ingredients');
    ingredientsContenair.appendChild(ingredientsBtnOpen);
}
function displayIngredients(ingredients) {
    const ingredientsContenair = document.querySelector('.ingredients_contenair');
    ingredientsContenair.innerHTML = '';

    ingredients.forEach((ingredient) => {
        createIngredientInDropdown(ingredient);
    })
}

// TAGS APPAREILS
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
    const appareilsContenair = document.querySelector('.appareils_contenair');

    const appareilsModel = appareilsFactory(appareil);
    const appareilsCardDOM = appareilsModel();
    appareilsContenair.appendChild(appareilsCardDOM);

    appareilsCardDOM.addEventListener('click', (event) => onAppareilsClick(event, appareil));

    const listAppareils = document.querySelector('.list_appareils');
    appareilsContenair.appendChild(listAppareils);
}
function displayAppareils(appliance) {
    const appareilsContenair = document.querySelector('.appareils_contenair');
    appareilsContenair.innerHTML = '';

    appliance.forEach((appareil => {
        createAppareilInDropdown(appareil);
    }))
}

// TAGS USTENSILS
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
    const ustensilsContenair = document.querySelector('.ustensils_contenair');

    const ustensilsModel = ustensilsFactory(ustensil);
    const ustensilsCardDOM = ustensilsModel();
    ustensilsContenair.appendChild(ustensilsCardDOM);

    ustensilsCardDOM.addEventListener('click', (event) => onUstensilsClick(event, ustensil));

    const listUstensils = document.querySelector('.list_ustensils');
    ustensilsContenair.appendChild(listUstensils);
}
function displayUstensils(ustensils) {
    const ustensilsContenair = document.querySelector('.ustensils_contenair');
    ustensilsContenair.innerHTML = '';

    ustensils.forEach((ustensil => {
        createUstensilInDropdown(ustensil);
    }))
}

// RECUPERATION DES DATA DES RECETTES
// INGREDIENTS
function getIngredientsForRecipes() {
    let ingredientToDisplay = [];

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            // Supprime les éléments en double
            const isIngredientAlreadyDisplayed = ingredientToDisplay.find(ingredientUnique => ingredient.ingredient.toLowerCase() === ingredientUnique.ingredient.toLowerCase());
            const isIngredientAlreadySelected = ingredientToDisplay.includes(ingredient);

            if (isIngredientAlreadyDisplayed === undefined && isIngredientAlreadySelected === false) {
                ingredientToDisplay.push(ingredient);
            }
        })
    });
    return ingredientToDisplay;
}
// APPAREILS
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
// USTENSILS
function getUstensilsForRecipes() {
    let ustensilToDisplay = [];

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            // Supprime les éléments en double
            const isUstensilAlreadyDisplayed = ustensilToDisplay.find(ustensilUnique => ustensil.toLowerCase() === ustensilUnique);
            const isUstensilAlreadySelected = ustensilToDisplay.includes(ustensil);

            if (isUstensilAlreadyDisplayed === undefined && isUstensilAlreadySelected === false) {
                ustensilToDisplay.push(ustensil);
            }
        });
    });
    return ustensilToDisplay;
}

// AFFICHAGE DATA BOUTONS DEROULANTS
async function displayBtn(recipes) {
    const ingredients = getIngredientsForRecipes(recipes);
    displayIngredients(ingredients);

    const appareils = getAppareilsForRecipes(recipes);
    displayAppareils(appareils);

    const ustensils = getUstensilsForRecipes(recipes);
    displayUstensils(ustensils);
}

// FONCTIONNEMENT BOUTONS DEROULANTS
function initIngredientsDropdown() {
    const btnIngredients = document.querySelector('.btnSearchIngredients');
    const ingredientsContenair = document.querySelector('.ingredients_contenair');

    const btnIngredientsClose = document.querySelector('.ingredients_btn_close');
    btnIngredientsClose.addEventListener('click', function() {
        btnIngredientsClose.style.display = 'none';
        btnIngredients.style.display = 'flex';
        ingredientsContenair.style.display = 'flex';
    });
    const closeListIngredients = document.querySelector('.close-ingredients');
    closeListIngredients.addEventListener('click', function() {
        btnIngredientsClose.style.display = 'flex';
        btnIngredients.style.display = 'none';
        ingredientsContenair.style.display = 'none';
    });
}
function initAppareilsDropdown() {
    const btnAppareils = document.querySelector('.btnSearchAppareils');
    const appareilsContenair = document.querySelector('.appareils_contenair');

    const btnAppareilsClose = document.querySelector('.appareils_btn_close');
    btnAppareilsClose.addEventListener('click', function() {
        btnAppareilsClose.style.display = 'none';
        btnAppareils.style.display = 'flex';
        appareilsContenair.style.display = 'flex';
    });
    const closeListAppareils = document.querySelector('.close-appareils');
    closeListAppareils.addEventListener('click', function() {
        btnAppareilsClose.style.display = 'flex';
        btnAppareils.style.display = 'none';
        appareilsContenair.style.display = 'none';
    });
}
function initUstensilsDropdown() {
    const btnUstensils = document.querySelector('.btnSearchUstensils');
    const ustensilsContenair = document.querySelector('.ustensils_contenair');

    const btnUstensilsClose = document.querySelector('.ustensils_btn_close');
    btnUstensilsClose.addEventListener('click', function() {
        btnUstensilsClose.style.display = 'none';
        btnUstensils.style.display = 'flex';
        ustensilsContenair.style.display = 'flex';
    });
    const closeListUstensils = document.querySelector('.close-ustensils');
    closeListUstensils.addEventListener('click', function() {
        btnUstensilsClose.style.display = 'flex';
        btnUstensils.style.display = 'none';
        ustensilsContenair.style.display = 'none';
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