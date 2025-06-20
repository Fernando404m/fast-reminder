const publicVapidKey = 'BNEvisOr_AO1s-EgXXay-5XHl6BS1y7K3aHAsfuqG7FzOaxhoIa_ivtglROS6GBtHZJ2kB5pNXb5B_AtL95ti50';
const backendURL = 'https://fast-reminder-production.up.railway.app';

async function init() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js');
      console.log('✅ Service Worker registrado.');

      document.getElementById('permitir').addEventListener('click', async () => {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
          });

          console.log('✅ Inscrição criada:', subscription);

          
          // Envia a inscrição para o backend
          await fetch(`${backendURL}/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription),
          });

          console.log('📨 Inscrição enviada para o backend.');
        } else {
          console.warn('❌ Permissão negada.');
        }
      });

    } catch (err) {
      console.error('Erro ao registrar Service Worker:', err);
    }
  } else {
    console.warn('❌ Push não suportado neste navegador.');
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}


// enviar a notificaçao para o backend
document.getElementById('testar').addEventListener('click', async () => {
  await fetch(`${backendURL}/lembrete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: '📌 Lembrete',
      body: 'Você tem uma nova tarefa!',
      datetime: "{YYYY-MM-DD}T{hh:mm:ss.ms}Z" // preciso ajustar isso pra automatizar ----------
    }),
  });

  console.log('🚀 Notificação enviada pelo backend.');
});


init();
