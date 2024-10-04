chrome.alarms.onAlarm.addListener(function(alarm) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',  // Ícono de la notificación
    title: '¡Reunión Próxima!',
    message: `Tienes una reunión próxima: ${alarm.name}`,
    priority: 2
  });
});
