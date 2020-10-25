/**
 * MutationObserver: https://developer.mozilla.org/es/docs/Web/API/MutationObserver
 * 
 * Técnica de observación de mutaciones/cambios en los nodos (ver link de arriba) 
 * que remplaza el seguimiento de eventos click que no funcionaba con gestos swipe * 
 */

/**
 * Lista de secciones de las que se hacen swipe
 * 
 * Se utiliza para filtrar las páginas que quedan en los bordes de la que 
 * se muestra actualmente y ocultarlas con opacity: 0
 */
const pagesToSwippingAndHide = [
    '#settings_page', '#menu_page', '#leaderboard_page',
];

/**
 * Clase a buscar en sección a mostrar.
 * 
 * De los nodos section anteriores que la contenga en atributo class se mostrará con opacity: 1
 * el resto se ocultarán con opacity: 1
 */
const classWithPageToShow = 'swiper-slide-active';

/**
 * Configuramos la instancia de MutationObserver: Destino
 */
const targets = { // Secciones a observar
    settings: document.querySelector('#settings_page'),
    menu: document.querySelector('#menu_page'),
    leaderboard: document.querySelector('#leaderboard_page')
}

/**
 * Configuramos lo que se observará de los nodos, cambios en atributo 'class'
 * 
 * Para más configuraciones ver link al principio
 */
const config = {
    attributes: true, // Se observan cambios en los atributos ...
    attributeName: ['class'] // ... en concreto en atributo class
};

/**
 * @function callbackMutationObserver
 * @param mutationsList Lista de mutaciones/cambios observados en el nodo
 * @author Juan Manuel Hernández
 * 
 * Función de detección de modificación de atributos, especifica la opacidad al valor:
 *   - 1 si se detecta la clase 'swiper-slide-active' en la lista de clases del nodo
 *   - 0 en caso contrario
 * Es decir, esconde
 */

const callbackMutationObserver = (mutationsList) => {
    mutationsList.forEach(mutation => {
        if (mutation.attributeName === 'class') {
            let op = mutation.target.classList.contains(classWithPageToShow) ? 1 : 0; // La propiedad css opacito debe ser 0 o 1
            anime.set('#' + mutation.target.id, { // Elemento al que aplicar la propiedad para animación
                opacity: op // Así no se ven pero no las escondo con visibility: 'hidden'
            });
            console.log('callbackMutationObserver:', mutation.target.id, mutation.type, mutation.attributeName, `Opacity: ${op}`);
        }
    });
}

/**
 * Instanciamos observadores de MutationObserver, sólo son tres por eso el código no es largo
 */
const observer_settings = new MutationObserver(callbackMutationObserver);
const observer_menu = new MutationObserver(callbackMutationObserver);
const observer_leaderboard = new MutationObserver(callbackMutationObserver);

/**
 * Iniciamos observación, sólo son tres por eso el código no es largo
 */
observer_settings.observe(targets.settings, config);
observer_menu.observe(targets.menu, config);
observer_leaderboard.observe(targets.leaderboard, config);

/**
 * @function pagesWhatHide * 
 * @param pageToShow página que se va a mostrar
 * @author Juan Manuel Hernández
 * @deprecated No funcionaba correctamente con el gesto swipe ... se cambia por técnica MutationObserver
 * 
 * Cuando se muestra una pagina las otras que están a su lado e ven por los bordes,
 * esta función las esconde.
 * 
 * 
 */
// const pagesWhatHide = (pageToShow) => {
//     const pagesToHide = pagesToSwippingAndHide.filter(pages => pages != pageToShow);

//     console.log(`pagesToHide: Escondemos ${pagesToHide}, mostramos: ${pageToShow}`);

//     anime.set(pageToShow, {
//         opacity: 1 // Así no se ven pero no las escondo
//     });

//     anime.set(pagesToHide, {
//         opacity: 0 // Así no se ven pero no las escondo
//     });
// }