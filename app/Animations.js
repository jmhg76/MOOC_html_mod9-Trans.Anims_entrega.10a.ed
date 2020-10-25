/**
 * 
 * animation_FadeIn
 * 
 * Ejemplo de animación. Todas las animaciones tienen siempre 3 pasos: 
 *       a. Seleccionamos los elementos a animar
 *       b. Hemos visto que anime se comporta mejor con CSS declarado en el atributo style del HTML
 *          Por lo tanto, si queremos hacer alguna animación, podemos iniciar los valores con anime.set
 *       c. Animamos, con un timeline mejor, para poder concatenar animaciones...
 *       d. Si queremos meter alguna función después de animar podemos meter el callback complete o usar promesas...
 * 
 * 
 */
const animation_FadeIn = () => {
    // Selecciona elementos a animar
    const splash = GAME_UI.pages.splash;
    const title = splash.querySelector('h1');

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(splash, {
        visibility: 'visible',
        opacity: 0
    });
    anime.set(title, {
        opacity: 0,
        translateY: 50
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 500,
        easing: 'easeInOutSine'
    });

    animation_layout
        .add({
            targets: [splash],
            opacity: 1
        })
        .add({
            targets: [title],
            opacity: 1,
            translateY: 0
        }, '-=200');
};


/**
 * El resto de animaciones las construyes tú. 
 * Recuerda que puedes guardar las animaciones del layout
 * en la variable global animation
 */
const animation_SplashToMenu = (getTo) => {
    // Selecciona elementos a animar
    const from = GAME_UI.pages.splash;
    const to = GAME_UI.pages.swiperContainer;

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(to, {
        visibility: 'visible',
        translateY: '100%',
        opacity: 0
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 750,
        easing: 'easeInOutSine'
    });
    animation_layout
        .add({
            targets: [from],
            translateY: '-100%',
            opacity: 0
        })
        .add({
            targets: [to],
            translateY: 0,
            opacity: 1
        }, '-=750');
};


/**
 * 
 * Ejemplo de un popup, como vemos, es lo mismo....
 */
const animation_PopupPause = (getTo) => {
    const popup = document.querySelector('#modal_pause_window');

    anime.set(popup, {
        translateY: '20%',
        opacity: 0,
        visibility: 'visible'
    });

    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: popup,
        translateY: '0%',
        opacity: 1
    });

    animation_layout.finished.then(() => {
        game.pauseOrResume();
    });
};


/**
 * 
 * Vuelta del popup modal
 * 
 * @author: Juan Manuel Herñández
 */
const animation_PopupContinue = (getTo) => {
    const popup = document.querySelector('#modal_pause_window');

    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: popup,
        translateY: '-20%',
        opacity: 0
    });

    animation_layout.finished.then(() => { // Después de la animación iniciamos el juego
        game.pauseOrResume();
        anime.set(popup, { // ... quitamos la caja de enmedio para que no moleste
            visibility: 'hidden'
        });
    });

}

/**
 * 
 * Vuelta del popup modal
 * 
 * @author: Juan Manuel Herñández
 */
const animation_ConfirmIn = (getTo) => {
    const popup = document.querySelector('#modal_confirm');

    anime.set(popup, {
        translateY: '-20%',
        opacity: 0,
        visibility: 'visible'
    });

    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: [popup],
        translateY: '-20%',
        opacity: 1
    });
}

/**
 * 
 * Vuelta del dialogo modal al juego
 * 
 * @author: Juan Manuel Herñández
 */
const animation_ConfirmOut = (getTo) => {
    const popup = document.querySelector('#modal_confirm');

    anime.set(popup, {
        translateY: '-20%',
        opacity: 0,
        visibility: 'visible'
    });

    animation_layout = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });

    animation_layout.add({
        targets: [popup],
        translateY: '20%',
        opacity: 0
    });

    animation_layout.finished.then(() => { // Después de la animación iniciamos el juego
        anime.set(popup, { // ... quitamos la caja de enmedio para que no moleste
            visibility: 'hidden'
        });
    });
}


/**
 * @function animation_MenuToGame(getTo);
 * @param getTo pantalla finalmente visible / sección destino de la animación
 * @author Juan Manuel Hernández
 * 
 * Ejemplo de animación. Todas las animaciones tienen siempre 3 pasos: 
 *       a. Seleccionamos los elementos a animar
 *       b. Hemos visto que anime se comporta mejor con CSS declarado en el atributo style del HTML
 *          Por lo tanto, si queremos hacer alguna animación, podemos iniciar los valores con anime.set
 *       c. Animamos, con un timeline mejor, para poder concatenar animaciones...
 *       d. Si queremos meter alguna función después de animar podemos meter el callback complete o usar promesas...
 */

const animation_MenuToGame = (getTo) => {
    console.log(`const animation_MenuToGame = (${getTo})`);
    // Selecciona elementos a animar
    const from = document.querySelector('#swiper_page');
    const to = document.querySelector('#main_page');

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(to, { // Se inicia con el destino "escondido" con opacity 0
        visibility: 'visible',
        translateY: '100%',
        opacity: 0
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 750,
        easing: 'easeInOutSine'
    });

    // Capas de la animación
    animation_layout
        .add({ // Animamos el destino 
            targets: [from],
            translateY: '100%', // ... que se vaya hacia abajo
            opacity: 0
        })
        .add({ // Animamos el origen 
            targets: [to],
            translateY: '0%', // ... que se vaya hacia abajo
            opacity: 1
        }, '-=750')

    // Hace falta alguna promesa o algún callback para ejeuctar siguientes animaciones
    animation_layout.finished.then(() => { // ... finalizadas las animaciones comenzamos el juego
        game = new Game();
        game.start();
    });
};

/**
 * @function animation_GameToMenu(getTo);
 * @param getTo pantalla finalmente visible / sección destino de la animación
 * @author Juan Manuel Hernández
 * 
 * Ejemplo de animación. Todas las animaciones tienen siempre 3 pasos: 
 *       a. Seleccionamos los elementos a animar
 *       b. Hemos visto que anime se comporta mejor con CSS declarado en el atributo style del HTML
 *          Por lo tanto, si queremos hacer alguna animación, podemos iniciar los valores con anime.set
 *       c. Animamos, con un timeline mejor, para poder concatenar animaciones...
 *       d. Si queremos meter alguna función después de animar podemos meter el callback complete o usar promesas...
 * 
 */

const animation_GameToMenu = (getTo) => {
    console.log(`const animation_GameToMenu = (${getTo})`);

    // Selecciona elementos a animar
    const from = document.querySelector('#main_page');
    const to = document.querySelector('#swiper_page');

    // Necesitas meter algo de CSS antes de la animación??
    anime.set(to, { // Se inicia con el destino "escondido" con opacity 0
        visibility: 'visible',
        translateY: '100%',
        opacity: 0
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 750,
        easing: 'easeInOutSine'
    });

    // Capas de la animación
    animation_layout
        .add({ // Animamos el destino 
            targets: [from],
            translateY: '-100%', // ... que se vaya hacia arriba
            opacity: 0
        })
        .add({ // Animamos el origen 
            targets: [to],
            translateY: '0%', // ... que se vaya hacia arriba
            opacity: 1
        }, '-=750')

    // Hace falta alguna promesa o algún callback para ejeuctar siguientes animaciones
    animation_layout.finished.then(() => { // ... finalizadas las animaciones comenzamos el juego
        anime.set(from, {
            visibility: 'hidden'
        });
        game.ended = true; // Así paramos la instancia actual del juego
        // Debemos borrar toda la pantalla para no tener el juego amterior
        document.querySelector('.game').innerHTML = "";
    });
};

/**
 * @function animation_slider(getTo);
 * @param getTo ...
 * @author Juan Manuel Hernández
 * 
 * Animación en slider de menú principal. Todas las animaciones tienen siempre 3 pasos: 
 *       a. Seleccionamos los elementos a animar
 *       b. Hemos visto que anime se comporta mejor con CSS declarado en el atributo style del HTML
 *          Por lo tanto, si queremos hacer alguna animación, podemos iniciar los valores con anime.set
 *       c. Animamos, con un timeline mejor, para poder concatenar animaciones...
 *       d. Si queremos meter alguna función después de animar podemos meter el callback complete o usar promesas...
 */
const animation_slider = (getTo) => {
    console.log(`const animation_GameToMenu = (${getTo})`);

    // Selecciona elementos a animar
    const bueno = document.querySelector('#imgBuenoToAnime');
    const malo = document.querySelector('#imgMaloToAnime');

    // Necesitas meter algo de CSS antes de la animación??
    anime.set([bueno, malo], { // Empezamos sin que se vean los actores bueno y malo "escondidos" con opacity 0
        visibility: 'visible',
        scale: 10, // ... que empiecen muy grandes ...
        opacity: 0
    });

    // Anima!
    animation_layout = anime.timeline({
        duration: 1500,
        easing: 'easeInOutSine'
    });

    // Capas de la animación
    animation_layout
        .add({
            targets: [bueno, malo],
            scale: 2.5, // ... se acercan a su tamaño en pantalla ...
            opacity: 1
        }, '+=1000') // retardo para que concluya el traslado de la pantalla
        .add({
            targets: [bueno, malo],
            scale: 0.5, // ... se alejan al fondo ...
        })
        .add({
            targets: bueno,
            scale: 2.5, // ... y terminan en su lugar ...
            rotate: '2turn', // ... mientras el bueno gira dos veces hacia un lado ...
        }, '+=500')
        .add({
            targets: malo,
            scale: 2.5, // ... y terminan en su lugar ...
            rotate: '-2turn', // ... mientras el malo gira dos veces hacuia el otro lado ...
        }, '-=1500')

    // Hace falta alguna promesa o algún callback para ejeuctar siguientes animaciones
    animation_layout.finished.then(() => { // ... finalizadas las animaciones comenzamos el juego
    });
}