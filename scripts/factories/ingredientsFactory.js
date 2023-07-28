export function ingredientsFactory(ingredient) {
    const ingredientsContenair = document.querySelector('.ingredients_contenair');
    // Affichage liste ingrédients
    function getIngredientsCardDOM() {
        const listIngredients = document.createElement('button');
        listIngredients.className = 'list_ingredients';
        listIngredients.textContent = ingredient.ingredient.toLowerCase();
        
        ingredientsContenair.appendChild(listIngredients);
    
        return listIngredients;
    }
    return getIngredientsCardDOM;
}

export function tagsIngredientsFactory(ingredient) {
    const tagsSelected = document.querySelector('.tags_selected');
    // Affichage tags ingrédients
    function getTagsIngredientsCardDom() {
        const tagIngredients = document.createElement('div');
        tagIngredients.className = 'tag_ingredients';
        tagIngredients.id = ingredient.ingredient;

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
