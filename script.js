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
    document.getElementById(id).textContent = turnoActual;
    
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
      turnoActual = turnoActual === 'X' ? 'O' : 'X';
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
        document.getElementById('celda' + i).textContent = '';
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
  