/**
 * Consts and state
 */


// Contenedor de instancia del juego
let game;


// Valores constantes
const OPPONENT_HEIGHT = 5,
    OPPONENT_PICTURE = "assets/svg/malo.svg", // "assets/img/malo.png",
    OPPONENT_PICTURE_DEAD = "assets/svg/malo_muerto.svg", //"assets/img/malo_muerto.png",
    OPPONENT_SPEED = 5,
    OPPONENT_WIDTH = 5,
    GAME_OVER_PICTURE = "assets/img/game_over.png",
    KEY_LEFT = "LEFT",
    KEY_RIGHT = "RIGHT",
    KEY_SHOOT = "SHOOT",
    MIN_TOUCHMOVE = 20,
    PLAYER_HEIGHT = 5,
    PLAYER_PICTURE = "assets/svg/bueno.svg", //"assets/img/bueno.png",
    PLAYER_PICTURE_DEAD = "assets/svg/bueno_muerto.svg", //"assets/img/bueno_muerto.png",
    PLAYER_SPEED = 20,
    PLAYER_WIDTH = 5,
    SHOT_HEIGHT = 1.5,
    SHOT_SPEED = 20,
    SHOT_PICTURE_PLAYER = "assets/svg/shot1.svg", //"assets/img/shot1.png",
    SHOT_PICTURE_OPPONENT = "assets/svg/shot2.svg", //"assets/img/shot2.png",
    SHOT_WIDTH = 1.5;


// Selectores DOM y estado del juego
const GAME_UI = {
    app: document.querySelector('#app'),
    gameBoard: document.querySelector('.game'),
    pages: {
        splash: document.querySelector('#splash_page'),
        swiperContainer: document.querySelector('#swiper_page'),
        main: document.querySelector('#main_page'),
        menu: document.querySelector('#menu_page'),
        settings: document.querySelector('#settings_page'),
        leaderboard: document.querySelector('#leaderboard_page')
    },
    modalWindows: {
        pause: document.querySelector('#modal_pause_window'),
        confirm: document.querySelector('#modal_confirm'),
        spinner: document.querySelector('#modal_loading_spinner')
    },
    state: {
        navigationStage: '',
        playing: false,
        paused: false,
        spinning: false
    }
};



/**
 * loading scripts
 */
window.addEventListener('load', () => {
    initNavigation();
    initUI();
    navigationTo('#splash_page', 'fade_in');
});