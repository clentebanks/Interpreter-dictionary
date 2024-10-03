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
