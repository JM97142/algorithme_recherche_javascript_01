export function appareilsFactory(appareils) {
    const divBtnAppareils = document.querySelector('.divBtnAppareils');
    // Affichage liste appreils
    function getAppareilsCardDOM() {
        const appareilsBtnOpen = document.createElement('button');
        appareilsBtnOpen.className = 'appareils_btn_open';
        appareilsBtnOpen.textContent = appareils;

        divBtnAppareils.appendChild(appareilsBtnOpen);
        
        return appareilsBtnOpen;
    }
    return getAppareilsCardDOM;
}

export function tagsAppareilsFactory(appareils) {
    const tagsSelected = document.querySelector('.tags_selected');
    // Affichage tags appareils
    function getTagsAppareilsCardDom() {
        const tagAppareils = document.createElement('div');
        tagAppareils.className = 'tag_appareils';
        tagAppareils.id = appareils;

        const appareilName = document.createElement('span');
        appareilName.className = 'nameAppareil';
        appareilName.textContent = appareils;

        const closeTag = document.createElement('span');
        closeTag.className = 'closeTag';
        const closeIcon = document.createElement('i');
        closeTag.className = 'fa-regular fa-circle-xmark';

        tagAppareils.appendChild(appareilName);
        closeTag.appendChild(closeIcon);
        tagAppareils.appendChild(closeTag);
        tagsSelected.appendChild(tagAppareils);

        return tagAppareils;
    }
    return getTagsAppareilsCardDom;
}
export default {appareilsFactory, tagsAppareilsFactory};