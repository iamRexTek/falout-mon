const seleccionarMascotaBtn = document.getElementById('seleccionar-mascota-btn');
const playerLivesSpan = document.getElementById('player-lives');
const enemyLivesSpan = document.getElementById('enemy-lives');
const ataqueFuegoBtn = document.getElementById('ataque-fuego');
const ataqueAguaBtn = document.getElementById('ataque-agua');
const ataqueTierraBtn = document.getElementById('ataque-tierra');

let selectedMascota = null;
let playerLives = 3;
let enemyLives = 3;
let enemyMascota = null;

const mascotas = ['hipodoge', 'capipepo', 'ratigueya'];

seleccionarMascotaBtn.addEventListener('click', () => {
  const selectedRadio = document.querySelector('input[name="mascota"]:checked');
  if (selectedRadio) {
    selectedMascota = selectedRadio.value;
    console.log('Seleccionaste:', selectedMascota);

    // Seleccionar la mascota del enemigo aleatoriamente
    enemyMascota = mascotas[Math.floor(Math.random() * mascotas.length)];
    console.log('El enemigo ha seleccionado:', enemyMascota);

    // Mostrar la sección de ataque
    document.getElementById('seleccionar-ataque').style.display = 'block';
    document.getElementById('seleccionar-mascota').style.display = 'none';
  } else {
    alert('Por favor selecciona una mascota');
  }
});

ataqueFuegoBtn.addEventListener('click', () => {
  attack('fuego');
});

ataqueAguaBtn.addEventListener('click', () => {
  attack('agua');
});

ataqueTierraBtn.addEventListener('click', () => {
  attack('tierra');
});

function attack(tipoAtaque) {
  if (selectedMascota) {
    console.log('Tu mascota ataca con', tipoAtaque);

    // Simular el ataque del enemigo
    const enemyAttackType = ['fuego', 'agua', 'tierra'][Math.floor(Math.random() * 3)];
    console.log('El enemigo ataca con', enemyAttackType);

    // Calcular el daño
    let playerDamage = 0;
    let enemyDamage = 0;

    if (tipoAtaque === 'fuego') {
      if (enemyAttackType === 'agua') {
        playerDamage = 2;
      } else if (enemyAttackType === 'tierra') {
        enemyDamage = 2;
      }
    } else if (tipoAtaque === 'agua') {
      if (enemyAttackType === 'tierra') {
        playerDamage = 2;
      } else if (enemyAttackType === 'fuego') {
        enemyDamage = 2;
      }
    } else if (tipoAtaque === 'tierra') {
      if (enemyAttackType === 'fuego') {
        playerDamage = 2;
      } else if (enemyAttackType === 'agua') {
        enemyDamage = 2;
      }
    }

    // Actualizar las vidas
    playerLives = Math.max(0, playerLives - playerDamage); // Vida del jugador no baja de 0
    enemyLives = Math.max(0, enemyLives - enemyDamage);   // Vida del enemigo no baja de 0

    playerLivesSpan.textContent = playerLives;
    enemyLivesSpan.textContent = enemyLives;

    // Comprobar si hay un ganador
    if (playerLives <= 0) {
      alert('¡El enemigo ha ganado!');
      finalizarJuego(); // Función para finalizar el juego (opcional)
    } else if (enemyLives <= 0) {
      alert('¡Has ganado!');
      finalizarJuego(); // Función para finalizar el juego (opcional)
    }
  } else {
    alert('Por favor selecciona una mascota primero');
  }
}

// Función opcional para finalizar el juego
function finalizarJuego() {
  // Desactivar los botones de ataque
  ataqueFuegoBtn.disabled = true;
  ataqueAguaBtn.disabled = true;
  ataqueTierraBtn.disabled = true;

  // Mostrar un mensaje que indica que el juego ha terminado
  const gameEndMessage = document.getElementById('game-end-message');
  gameEndMessage.style.display = 'block';
}