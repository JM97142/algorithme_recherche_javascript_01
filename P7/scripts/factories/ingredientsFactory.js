export function ingredientsFactory(ingredient) {
    const divBtnIngredients = document.querySelector('.divBtnIngredients');
    // Affichage liste ingrédients
    function getIngredientsCardDOM() {
        const ingredientsBtnOpen = document.createElement('button');
        ingredientsBtnOpen.className = 'ingredients_btn_open';
        ingredientsBtnOpen.textContent = ingredient.ingredient;
        
        divBtnIngredients.appendChild(ingredientsBtnOpen);
    
        return ingredientsBtnOpen;
    }
    return getIngredientsCardDOM;
}

export function tagsIngredientsFactory(ingredient) {
    const tagsSelected = document.querySelector('.tags_selected');
    const recipesSection = document.querySelector(".fiches_recipes");
    // Affichage tags ingrédients
    function getTagsIngredientsCardDom() {
        const tagIngredients = document.createElement('div');
        tagIngredients.className = 'tag_ingredients';

        const ingredientName = document.createElement('span');
        ingredientName.className = 'nameIngredient';
        ingredientName.textContent = ingredient.ingredient;

        const closeTag = document.createElement('span');
        const closeIcon = document.createElement('i');
        closeTag.className = 'fa-regular fa-circle-xmark';
        
        tagIngredients.appendChild(ingredientName);
        closeTag.appendChild(closeIcon);
        tagIngredients.appendChild(closeTag);
        tagsSelected.appendChild(tagIngredients);

        return tagIngredients;
    }
    return getTagsIngredientsCardDom;
}
export default {ingredientsFactory, tagsIngredientsFactory};
