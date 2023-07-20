export function ustensilsFactory(ustensil) {
    const ustensilsContenair = document.querySelector('.ustensils_contenair');
    // Affichage liste ustensiles
    function getUstensilsCardDOM() {
        const listUstensils = document.createElement('button');
        listUstensils.className = 'list_ustensils';
        listUstensils.textContent = ustensil;
        
        ustensilsContenair.appendChild(listUstensils);
        
        return listUstensils;
    }
    return getUstensilsCardDOM;
}

export function tagsUstensilsFactory(ustensil) {
    const tagsSelected = document.querySelector('.tags_selected');
    // Affichage tags ustensiles
    function getTagsUstensilsCardDom() {
        const tagUstensils = document.createElement('div');
        tagUstensils.className = 'tag_ustensils';
        tagUstensils.id = ustensil;

        const ustensilName = document.createElement('span');
        ustensilName.className = 'nameUstensil';
        ustensilName.textContent = ustensil;
        
        const closeTag = document.createElement('span');
        closeTag.className = 'closeTag';
        const closeIcon = document.createElement('i');
        closeTag.className = 'fa-regular fa-circle-xmark';

        tagUstensils.appendChild(ustensilName);
        closeTag.appendChild(closeIcon);
        tagUstensils.appendChild(closeTag);
        tagsSelected.appendChild(tagUstensils);

        return tagUstensils;
    }
    return getTagsUstensilsCardDom;
}
export default {ustensilsFactory, tagsUstensilsFactory};