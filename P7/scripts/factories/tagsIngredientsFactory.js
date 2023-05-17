export function tagsIngredientsFactory(ingredient) {
    const tagsSelected = document.querySelector('.tags_selected');
    const recipesSection = document.querySelector(".fiches_recipes");

    // Affichage liste des ingrédients
    function getTagsIngredientsCardDom() {
        const tagIngredients = document.createElement('div');
        tagIngredients.className = 'tag_ingredients';

        const ingredientName = document.createElement('span');
        ingredientName.className = 'nameIngredient';
        ingredientName.textContent = ingredient.ingredient;
        
        tagIngredients.appendChild(ingredientName);
        tagsSelected.appendChild(tagIngredients);

        return tagIngredients;
    }
    return getTagsIngredientsCardDom;
}
export default tagsIngredientsFactory;

