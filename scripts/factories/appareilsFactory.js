export function appareilsFactory(appareils) {
    const divBtnAppareils = document.querySelector('.divBtnAppareils');
    const inputAppareils = document.querySelector('#searchBtnAppareils');

    function getAppareilsCardDOM() {
        const appareilsBtnOpen = document.createElement('button');
        appareilsBtnOpen.className = 'appareils_btn_open';
        appareilsBtnOpen.textContent = appareils;

        divBtnAppareils.appendChild(appareilsBtnOpen);
                
        const btnAppareilsClose = document.querySelector('.appareils_btn_close');
        btnAppareilsClose.addEventListener('click', function() {
            btnAppareilsClose.style.display = 'none';
            inputAppareils.style.display = 'block';
            divBtnAppareils.style.display = 'flex';
            appareilsBtnOpen.style.display = 'block';
        });
        return appareilsBtnOpen;
    }
    return getAppareilsCardDOM;
}
export default appareilsFactory;