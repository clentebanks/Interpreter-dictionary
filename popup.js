document.getElementById('searchBtn').addEventListener('click', function() {
  const query = document.getElementById('searchTerm').value;
  if (query) {
    fetch(`http://localhost:5000/buscar?query=${query}`)
      .then(response => response.json())
      .then(data => {
        const resultsContainer = document.getElementById('result');
        resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

        if (data.length === 0) {
          resultsContainer.innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
        } else {
          data.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
              <h4>${item.palabra} ${item.acronimo ? '(Acrónimo)' : ''}</h4>
              <p><strong>Significado:</strong> ${item.significado}</p>
              <p><strong>Traducción:</strong> ${item.traduccion}</p>
            `;
            resultsContainer.appendChild(resultItem);
          });
        }
      })
      .catch(err => {
        console.error('Error al buscar:', err);
      });
  }
});

/**************************************************************** */
// Cronómetro para Breaks
// Inicializa las variables del cronómetro
let timer;
let timeLeft;

// Función para iniciar el cronómetro
document.getElementById('start-timer').addEventListener('click', function() {
  const breakDuration = parseInt(document.getElementById('break-duration').value);
  const durationType = document.getElementById('duration-type').value;

  // Convertir la duración a segundos
  timeLeft = durationType === 'hours' ? breakDuration * 3600 : breakDuration * 60;

  clearInterval(timer); // Limpiar cualquier cronómetro anterior

  timer = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('¡Descanso terminado!');
      document.getElementById('timer-display').textContent = '00:00'; // Reiniciar visualización
    } else {
      timeLeft--;
      document.getElementById('timer-display').textContent = formatTime(timeLeft);
    }
  }, 1000);
});

// Función para reiniciar el cronómetro
document.getElementById('reset-timer').addEventListener('click', function() {
  clearInterval(timer);
  timeLeft = 0; // Reiniciar el tiempo
  document.getElementById('timer-display').textContent = '00:00';
});

// Función para formatear el tiempo
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}


// Agenda para Reuniones
document.getElementById('agenda-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const sessionName = document.getElementById('session-name').value;
  const sessionDate = document.getElementById('session-date').value;
  const sessionTime = document.getElementById('session-time').value;

  //const dateTime = new Date(`${sessionDate}T${sessionTime}`).getTime();

  // Crear alarma
  //  chrome.alarms.create(`${sessionName}`, {
  //    when: dateTime
  //  });

  const listItem = document.createElement('li');
  listItem.className = 'list-group-item';
  listItem.textContent = `${sessionName} - ${sessionDate} ${sessionTime}`;

  document.getElementById('meeting-list').appendChild(listItem);

  // Limpiar formulario
  document.getElementById('agenda-form').reset();
});



/***************************************************************** */
// Compartir por Email
document.getElementById('shareEmail').addEventListener('click', function() {
  const result = document.getElementById('result').innerText;
  window.location.href = `mailto:?subject=Dictionary Result&body=${encodeURIComponent(result)}`;
});

// Compartir en Twitter
document.getElementById('shareTwitter').addEventListener('click', function() {
  const result = document.getElementById('result').innerText;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}`);
});

// Monetización: Simulación de una actualización a características premium
document.getElementById('upgradeBtn').addEventListener('click', function() {
  alert('En Proceso esta pagina (Payment page).');
});
