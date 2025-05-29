const publicVapidKey = 'BNEvisOr_AO1s-EgXXay-5XHl6BS1y7K3aHAsfuqG7FzOaxhoIa_ivtglROS6GBtHZJ2kB5pNXb5B_AtL95ti50';

async function init() {
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.register('/service-worker.js');
    console.log('Service Worker registrado.');

    document.getElementById('permitir').addEventListener('click', async () => {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        console.log('Inscrição criada:', JSON.stringify(subscription));
        // Aqui você precisa enviar isso para o backend
      }
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

init();
