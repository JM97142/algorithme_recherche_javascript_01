export function ingredientsFactory(ingredient) {
    const divBtnIngredients = document.querySelector('.divBtnIngredients');
    const inputIngredients = document.querySelector('#searchBtnIngredients');

    // Affichage liste des ingrédients
    function getIngredientsCardDOM() {
        const ingredientsBtnOpen = document.createElement('button');
        ingredientsBtnOpen.className = 'ingredients_btn_open';
        ingredientsBtnOpen.textContent = ingredient.ingredient;
        
        divBtnIngredients.appendChild(ingredientsBtnOpen);
        
        const ingredientsBtnClose = document.querySelector('.ingredients_btn_close');
        ingredientsBtnClose.addEventListener('click', function() {
            ingredientsBtnClose.style.display = 'none';
            inputIngredients.style.display = 'block';
            divBtnIngredients.style.display = 'flex';
            ingredientsBtnOpen.style.display = 'block';
        });
        return ingredientsBtnOpen;
    }
    return getIngredientsCardDOM;
}
export default ingredientsFactory;
