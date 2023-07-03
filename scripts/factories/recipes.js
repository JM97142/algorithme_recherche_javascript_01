export function recipesFactory(data) {

    const { id, name, servings, time, description, ingredients } = data

    const tRecipes = `${time} min`;

    function getRecipesCardDOM() {
        const recipesCard = document.createElement('article');

        const recipesImg = document.createElement('img');
        recipesImg.setAttribute('src', ' ');

        const divHeader = document.createElement('div');
        divHeader.className = 'fiches_header';
        
        const titleContent = document.createElement('h2');
        titleContent.textContent = name;
        
        const iconTime = document.createElement('i');
        iconTime.className = 'fa-regular fa-clock';

        const timeRecipes = document.createElement('span');
        timeRecipes.textContent = tRecipes;

        const divContent = document.createElement('div');
        divContent.className = 'fiches_content';

        const pIngredients = document.createElement('ul');
        pIngredients.className = 'content_ingredients';

        for (let i=0; i<data.ingredients.length; i++) {
            const ingredient = data.ingredients[i];

            const contentIngredients = document.createElement("li");

            const nameIngredients = document.createElement("span");
            nameIngredients.textContent = `${ingredient.ingredient}: `;

            pIngredients.appendChild(contentIngredients);
            contentIngredients.appendChild(nameIngredients);

            if (!undefined) {
                const quantityIngredients = document.createElement("span");
                quantityIngredients.textContent = ingredient.quantity;

                contentIngredients.appendChild(quantityIngredients);
            }
            if (!undefined) {
                const unitIngredients = document.createElement("span");
                unitIngredients.textContent = ingredient.unit;

                contentIngredients.appendChild(unitIngredients);
            }
        }

        const pDescription = document.createElement('p');
        pDescription.textContent = description;
        pDescription.className = 'content_text';

        recipesCard.appendChild(recipesImg);
        recipesCard.appendChild(divHeader);
        recipesCard.appendChild(divContent);
        divHeader.appendChild(titleContent);
        divHeader.appendChild(iconTime);
        divHeader.appendChild(timeRecipes);
        divContent.appendChild(pIngredients);
        divContent.appendChild(pDescription);

        return recipesCard;
    }
    return getRecipesCardDOM;
}
export default recipesFactory;