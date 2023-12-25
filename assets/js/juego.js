// 2C = Two of Clubs (Tréboles)
// 2D = Two of Diamond (Diamante)
// 2H = Two of Hearts (Corazones)
// 2S = Two of Spades (Espadas)

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
puntosCompu = 0;

// REFERENCIAS DE HTML
const btnPedir = document.querySelector( '#btnPedir' );
const puntosHtml = document.querySelectorAll( 'small' );
const divCartasJugador = document.querySelector( '#jugador-cartas' );
const divCartasCompu = document.querySelector( '#computadora-cartas' )


const btnNuevo = document.querySelector( '#btnNuevo' );
const btnDetener = document.querySelector( '#btnDetener' );


//Esta funcion crea un nuevo deck
const crearDeck = () => {
    for ( let i = 2; i <= 10; i++ ) {
        for ( let tipo of tipos ) {
            deck.push( i + tipo );
        }
    }
    for ( let tipo of tipos ) {
        for ( let esp of especiales ) {
            deck.push( esp + tipo );
        }
    }

    // console.log( deck );
    deck = _.shuffle( deck );
    // console.log( deck );
    return deck;
}
crearDeck();

//Esta funcion permite tomar 1 carta

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'Ya no hay mas cartas en el Deck';
    }

    const carta = deck.pop();
    // console.log( 'Pedir carta', deck );
    // console.log( carta );
    return carta;

}

// pedirCarta();

const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length - 1 );
    return ( isNaN( valor ) ) ?
        ( valor === 'A' ) ? 11 : 10
        : valor * 1;

    // LO QUE ESTA ARRIBA SUSTITUYE A ESTE BLOQUE DE CODIGO QUE SIGUE... BRUTAL.
    // let puntos = 0;
    // console.log( { valor } );

    // if ( isNaN( valor ) ) { // NaN = Not a Number
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    //     console.log( 'No es un Numero y vale: ', puntos );
    // } else {
    //     puntos = valor * 1; // Se multiplica por uno para convertir el valor en tipo Number
    //     console.log( 'Es un numero y vale: ', puntos );
    // }
}

const turnoCompu = ( puntosMinimos ) => {
    do {

        carta = pedirCarta();
        puntosCompu = puntosCompu + valorCarta( carta );
        console.log( 'carta: ', carta, 'Puntos Computadora: ', puntosCompu );
        puntosHtml[1].innerText = puntosCompu;

        const imgCarta = document.createElement( 'img' )
        // imgCarta.setAttribute( 'src', 'assets/cartas/' + carta + '.png' );
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );
        divCartasCompu.append( imgCarta );

        if ( puntosMinimos > 21 ) {
            break;
        }

    } while ( ( puntosCompu < puntosMinimos ) && ( puntosMinimos < 21 ) );



    setTimeout( () => {
        if ( puntosCompu === puntosMinimos ) {
            alert( "NADIE GANA, INTENTE DE NUEVO" );

        } else if ( puntosMinimos > 21 ) {
            alert( "Computadora Gana" );
            btnDetener.disabled = true;

        } else if ( puntosMinimos === 21 && puntosCompu != 21 ) {
            alert( 'Felicidades has ganado!!!!' );

        } else if ( puntosCompu === 21 && puntosMinimos != 21 ) {
            alert( 'Computadora  GANA!!!!' );

        } else if ( puntosCompu > 21 && puntosMinimos <= 21 ) {
            alert( 'Felicidades has ganado!!!!' );
            
        } else if ( puntosCompu > puntosMinimos && puntosCompu <= 21 ) {
            alert( 'Computadora  GANA!!!!' );
        }
    }, 100 );


}

const valor = valorCarta( pedirCarta() );
// console.log( { valor } );

//EVENTOS

btnPedir.addEventListener( 'click', () => {

    carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    console.log( 'carta: ', carta, 'Puntos Jugador: ', puntosJugador );
    puntosHtml[0].innerText = puntosJugador;



    const imgCarta = document.createElement( 'img' )
    // imgCarta.setAttribute( 'src', 'assets/cartas/' + carta + '.png' );
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add( 'carta' );
    divCartasJugador.append( imgCarta );


    if ( puntosJugador > 21 ) {
        btnPedir.disabled = true;
        turnoCompu( puntosJugador );
    } else if ( puntosJugador === 21 ) {
        btnPedir.disabled = true;
        turnoCompu( puntosJugador );
    }

} )

btnDetener.addEventListener( 'click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCompu( puntosJugador );
} )



btnNuevo.addEventListener( 'click', () => {
    console.clear();
    deck = [];
    crearDeck();

    puntosJugador = 0;
    puntosCompu = 0;
    puntosHtml[0].innerText = puntosJugador;
    puntosHtml[1].innerText = puntosCompu;

    // while ( divCartasJugador.firstChild ) {
    //     divCartasJugador.removeChild( divCartasJugador.firstChild );
    // }

    // while ( divCartasCompu.firstChild ) {
    //     divCartasCompu.removeChild( divCartasCompu.firstChild );
    // }

    divCartasJugador.innerHTML = '';
    divCartasCompu.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    // console.log( 'Reiniciando Puntos', puntosJugador, puntosCompu, 'Reiniciando Deck:', deck );
} )


