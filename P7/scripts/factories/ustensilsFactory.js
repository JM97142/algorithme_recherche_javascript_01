export function ustensilsFactory(ustensil) {
    const divBtnUstensils = document.querySelector('.divBtnUstensils');
    // Affichage liste ustensiles
    function getUstensilsCardDOM() {
        const ustensilsBtnOpen = document.createElement('button');
        ustensilsBtnOpen.className = 'ustensils_btn_open';
        ustensilsBtnOpen.textContent = ustensil;
        
        divBtnUstensils.appendChild(ustensilsBtnOpen);
        
        return ustensilsBtnOpen;
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