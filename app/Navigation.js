/**
 * Programmatic Navigation and Page Transitions
 * with SwiperJS and AnimeJS
 */


/**
 * Variables globales de navegación
 * En estas variables guardamos elementos DOM para trabajar con ellos
 */
let links;
let sections;
let modals;


/**
 * Variables globales de animación
 * Las animaciones las podemos guardar aquí: 
 * animaciones del layout, animaciones de componentes concretos, etc...
 * 
 * Si quieres crear una linea de animación nueva, puedes crear tus variables aquí
 */
let animation_layout;


/**
 * @function navigationErrHandler
 * @param {Error} err  
 * Trata errores que se den en la navegación
 */
const navigationErrHandler = (err = "") => {
    if (err) {
        console.error("Ops! Something went wrong");
        console.error(err);
    }
};


/**
 * @function initNavigation
 * 
 * 
 * Inicializa la navegación SPA (Single Page Application)
 * Para ello: 
 * 
 * 1. Capturo el evento sobre los tags <a> y prevengo que naveguen
 * 2. Todas las <a> tienen un atributo en el HTML llamado navigation-type
 * 3. En función de este navigation-type navegamos de 3 maneras diferentes: 
 * 
 *    - a. swipe
 *         Navegamos con Swiper entre páginas y menú principal. 
 *         El controlador de esta navegación en swiperJS
 * 
 *    - b. animation
 *         Vamos al juego o volvemos del juego o entre splash page y 
 *         menu. Esta navegación la hacemos con animeJS. Haciendo que haya pantallas 
 *         que entren y salgan animando propiedades CSS.
 *         El tipo de animación lo metemos en otro atributo llamado "animation-type". 
 *         Mirar primer ejemplo
 * 
 *    - c. modal
 *         Abrimos popups y los cerramos. Con animeJS.
 *         El tipo de animación lo metemos en otro atributo llamado "animation-type". 
 *         Mirar primer ejemplo
 * 
 */
const initNavigationEvents = () => {
    links.forEach(link => {
        link.addEventListener('click', ev => {
            ev.preventDefault();

            const navigationType = link.getAttribute('navigation-type');
            const animationType = link.getAttribute('animation-type');
            const getTo = '#' + link.href.split('#').slice(-1);

            console.log('initNavigationEvents:', navigationType, getTo);

            switch (navigationType) {
                case 'swipe':
                    swipeTo(getTo);
                    break;
                case 'animation':
                    navigationTo(getTo, animationType);
                    break;
                case 'modal':
                    popUpToggle(getTo, animationType);
                    break;
                default:
                    navigationErrHandler();
            }
        });
    });
};


/**
 * @function swipeTo
 * @param {String} getTo 
 * 
 * Función que controla la navegación con swiper.
 * Mirar documentación de swiper en eventos. 
 * Mirar documentación del bloque correspondiente para hacer una navegación con swiper
 */
const swipeTo = (getTo = '#menu_page') => {

    console.log('swipeTo:', getTo);

    /**
     * Navegar con swipes
     */
    let sections = document.querySelectorAll('.swiper_item'); // Coleccionamos los índices de las páginas swiper ...
    let index = Array.from(sections).findIndex(section => '#' + section.id == getTo); // ... seleccionamos el indice de la página swiper que coincida con el nombre de la página pasada en getTo ...
    swiper.slideTo(index); // ... y vamos a dicha página

    /**
     * Escondemos las páginas que NO deben verse
     */
    //pagesWhatHide(getTo);

    if (!swiper) {
        navigationErrHandler(`No has programado la funcionalidad de Swiper todavía!`);
    }

    // clean up funcs
    GAME_UI.state.navigationStage = getTo;
};



/**
 * @function navigationTo
 * @param {String} getTo
 * @param {String} animationType
 * 
 * Función que controla la navegación general.
 * Esta función actualiza el state de la aplicación
 * Y lanza las animaciones que queramos en función del animationType.
 * 
 */
const navigationTo = (getTo, animationType) => {

    console.log('navigationTo:', getTo, animationType);

    switch (animationType) {

        /**
         * Entrada de la app
         */
        case 'fade_in':
            animation_FadeIn(getTo);
            animation_layout.finished.then(() => {
                // Fake splash
                setTimeout(() => {
                    navigationTo('#swiper_page', 'splash_to_menu');
                }, 2000);
            });
            break;

            /**
             * Desde la pantalla splash al menú
             */
        case 'splash_to_menu':
            animation_SplashToMenu(getTo);
            // ¿Será buen sitio para hacer la animación?
            animation_slider(getTo);
            break;


            /**
             * Desde la pantalla el menu al juego
             * 
             * @author: Juan Manuel Hernández
             */

        case 'menu_to_game':
            animation_MenuToGame(getTo);
            break;

            /**
             * Desde la pantalla el juego al menu que ha sido game over
             * 
             * @author: Juan Manuel Hernández
             */
        case 'game_out':
            animation_ConfirmOut(getTo); // Si está activo ... salimos del dialogo modal ... 
            animation_PopupContinue(getTo); // Si está activo ... queremos seguir jugando
            animation_GameToMenu(getTo);
            break;

            /**
             * ErrHandler
             */
        default:
            navigationErrHandler(`No has programado el animation-type="${animationType}" todavía!`);
    }


    // clean up funcs
    GAME_UI.state.navigationStage = getTo;
};



/**
 * @function popUpToggle 
 * @param {String} getTo
 * @param {String} animationType
 * 
 * Función que controla la apertura y cierre de ventanas popup (salir del juego y confirmar).
 * Esta función actualiza el state de la aplicación
 * Y lanza las animaciones que queramos en función del animationType
 * 
 */
const popUpToggle = (getTo, animationType) => {

    console.log(getTo, animationType);

    switch (animationType) {
        /**
         * Lanzar popup de pausa en el juego
         */
        case 'pause_modal':
            animation_PopupPause(getTo);
            // ... la promesa para pausar o resumir el juego se ha quitado de aquí por claridad ... y se ha modivo a la función animation_PopupPause por claridad
            break;

        case 'resume_modal':
            animation_PopupContinue(getTo);
            break;

        case 'confirm_modal_in':
            animation_ConfirmIn(getTo);
            break;

        case 'confirm_modal_out':
            animation_ConfirmOut(getTo); // Salimos del dialogo modal ... 
            animation_PopupContinue(getTo); // ... y seguimos jugando
            break;

            /**
             * ErrHandler
             */
        default:
            navigationErrHandler(`No has programado el animation-type="${animationType}" todavía!`);
    }

    GAME_UI.state.navigationStage = getTo;
};





/**
 * @function show/hideSpinner
 * 
 * Función para sacar un spinner (ruedita dando vueltas) para 
 * procesos asíncronos de fetching
 * 
 */
const showSpinner = () => {
    GAME_UI.state.spinning = true;
    GAME_UI.modalWindows.spinner.classList.add('active');
};
const hideSpinner = () => {
    GAME_UI.state.spinning = false;
    GAME_UI.modalWindows.spinner.classList.remove('active');
};



/**
 * @function initNavigation
 * La ejecuto en main.js
 * 
 */
const initNavigation = () => {
    links = GAME_UI.app.querySelectorAll('a[href^="#"]');
    sections = GAME_UI.app.querySelectorAll('section');
    modals = GAME_UI.app.querySelector('modal_window');

    initNavigationEvents();
};