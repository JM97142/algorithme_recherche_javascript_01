export function ustensilsFactory(ustensil) {
    const divBtnUstensils = document.querySelector('.divBtnUstensils');
    const btnUstensils = document.querySelector('.btnSearchUstensils');
    const btnUstensilsClose = document.querySelector('.ustensils_btn_close');

    function getUstensilsCardDOM() {
        const ustensilsBtnOpen = document.createElement('button');
        ustensilsBtnOpen.className = 'ustensils_btn_open';
        ustensilsBtnOpen.textContent = ustensil;
        
        divBtnUstensils.appendChild(ustensilsBtnOpen);
        
        btnUstensilsClose.addEventListener('click', function() {
            btnUstensilsClose.style.display = 'none';
            btnUstensils.style.display = 'block';
            divBtnUstensils.style.display = 'flex';
            ustensilsBtnOpen.style.display = 'block';
        });
        return ustensilsBtnOpen;
    }
    return getUstensilsCardDOM;
}

export function tagsUstensilsFactory(ustensil) {
    const tagsSelected = document.querySelector('.tags_selected');

    function getTagsUstensilsCardDom() {
        const tagUstensils = document.createElement('div');
        tagUstensils.className = 'tag_ustensils';

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