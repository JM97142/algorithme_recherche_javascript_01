export function ustensilsFactory(ustensil) {
    const divBtnUstensils = document.querySelector('.divBtnUstensils');
    const inputUstensils = document.querySelector('#searchBtnUstensils');

    function getUstensilsCardDOM() {
        const ustensilsBtnOpen = document.createElement('button');
        ustensilsBtnOpen.className = 'ustensils_btn_open';
        ustensilsBtnOpen.textContent = ustensil;
        
        divBtnUstensils.appendChild(ustensilsBtnOpen);
                
        const btnUstensilsClose = document.querySelector('.ustensils_btn_close');
        btnUstensilsClose.addEventListener('click', function() {
            btnUstensilsClose.style.display = 'none';
            inputUstensils.style.display = 'block';
            divBtnUstensils.style.display = 'flex';
            ustensilsBtnOpen.style.display = 'block';
        });
        return ustensilsBtnOpen;
    }
    return getUstensilsCardDOM;
}
export default ustensilsFactory;