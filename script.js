
alert('Alberto Perez Ortega, 1DAM CENEC, TATETI')


// Inicializar el tablero del juego como una matriz 3x3
let tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  // Inicializar el contador de victorias para cada jugador
  let victorias = {
  X: 0,
  O: 0
  };
  // Inicializar el turno actual (X siempre comienza)
  let turnoActual = 'X';
  
  // Inicializar el color del brillo
  document.documentElement.style.setProperty('--brillo-color', 'rgb(255, 0, 242)');
  // Función para manejar los clics en las celdas
  function celdaClicada(evento) {
    // Obtener el id de la celda clicada
    let id = evento.target.id;
    
    // Convertir el id en coordenadas de la matriz
    let numeroCelda = id.charAt(5) - 1; // Restamos 1 porque los ids empiezan en 1
    let fila = Math.floor(numeroCelda / 3);
    let columna = numeroCelda % 3;
    
    // Si la celda ya fue marcada, ignorar el clic
    if (tablero[fila][columna] !== '') return;

    // Marcar la celda en el tablero
    tablero[fila][columna] = turnoActual;
    
    // Actualizar el contenido de la celda en la página
    //document.getElementById(id).textContent = turnoActual;
    let celda = document.getElementById(id);
    celda.textContent = turnoActual;

    // Añadir la clase CSS correspondiente a la celda
    celda.classList.add('celda' + turnoActual);
    

    // Comprobar si el turno actual ha ganado
    if (comprobarGanador(fila, columna)) {
      setTimeout(function(){

      // Incrementar el recuento de victorias
      victorias[turnoActual]++;
      // Actualizar el HTML
    document.getElementById('victorias' + turnoActual).textContent = ' Victorias= ' + victorias[turnoActual];
      alert(turnoActual + ' ha ganado!');
      reiniciarJuego();
     },100)

    }else if (tablero.flat().every(celda => celda !== '')) {
      setTimeout(function(){

      alert('Empate!');
      reiniciarJuego();
    },100)
    }else{
      // Cambiar el turno
      if(turnoActual === 'X') {
        turnoActual = 'O';
        document.documentElement.style.setProperty('--brillo-color', 'rgb(0, 255, 255)');
        document.documentElement.style.setProperty('--borde-color', 'rgb(0, 255, 100)');
      } else {
        turnoActual = 'X';
        document.documentElement.style.setProperty('--brillo-color', 'rgb(171,32,253)');
        document.documentElement.style.setProperty('--borde-color', 'rgb(228, 13, 217)');

     // turnoActual = turnoActual === 'X' ? 'O' : 'X';
      }
    }
    
   
  }
  
  function reiniciarJuego(){
    if (confirm('¿Quieres volver a jugar?')) {
      tablero = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      // Restablecer el turno
      turnoActual = 'X';
      // Limpiar el contenido de las celdas en la página
      for (let i = 1; i <= 9; i++) {
        let celda = document.getElementById('celda' + i);
        celda.textContent = '';
        // Eliminar las clases CSS de la celda
        celda.classList.remove('celdaX', 'celdaO');
      }
    
    } else {
      alert('Hasta pronto');
    }
  }


  // Función para comprobar si el jugador del turno actual ha ganado
  function comprobarGanador(fila, columna) {
    // Comprobar la fila y la columna de la última jugada y las dos diagonales
    return (
      comprobarLinea(tablero[fila]) ||
      comprobarLinea(tablero.map(f => f[columna])) ||
      comprobarLinea(tablero.map((f, i) => f[i])) ||
      comprobarLinea(tablero.map((f, i) => f[2 - i]))
    );
  }
  
  // Función para comprobar si todas las celdas en una línea son iguales
  function comprobarLinea(linea) {
    return linea.every(celda => celda === turnoActual);
  }
  
  // Añadir el manejador de clics a todas las celdas
  for (let i = 1; i <= 9; i++) {
    document.getElementById('celda' + i).addEventListener('click', celdaClicada);
  }
  