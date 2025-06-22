const publicVapidKey = 'BNEvisOr_AO1s-EgXXay-5XHl6BS1y7K3aHAsfuqG7FzOaxhoIa_ivtglROS6GBtHZJ2kB5pNXb5B_AtL95ti50';
const backendURL = 'https://fast-reminder-production.up.railway.app';

async function init() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js');
      console.log('✅ Service Worker registrado.');

      document.getElementById('notification').addEventListener('click', async () => {
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
async function sendReminder() {
  let title = document.getElementById("input-title").value.trim()
  let desc = document.getElementById("input-desc").value.trim()
  let timeIds = ["date-d", "date-m", "date-y", "date-h", "date-min"]

  if (!document.getElementById("date-h") || !document.getElementById("date-min")) {
      throw console.error("insira pelo menos os valores de hora e minuto");
    }
  
  let setedTime = timeIds.map(id => {

    let value = document.getElementById(id).value

    if (value == "" && id != "date-h" && id != "date-min") {
      switch (id) {
        case "date-d":
          value = new Date().getDate()
          break;
        case "date-m":
          value = new Date().getMonth() + 1
          break;
        case "date-y":
          value = String(new Date().getFullYear())
        break;
        default:
          break
      }
    }

    if (id != "date-y") {
      return String(value).padStart(2, "0")
    }

    if (id == "date-d" && `${document.getElementById("date-h").value}${document.getElementById("date-min").value}` < `${new Date().getHours()}${new Date().getMinutes()}`) {
      value += 1
    }

    return value
  })
  let datetimeInIso = `${setedTime[2]}-${setedTime[1]}-${setedTime[0]}T${setedTime[3]}:${setedTime[4]}:00-03:00`

  if (new Date(datetimeInIso).getTime() < new Date.now()) {
    throw new Error("data invalida")
  }

  await fetch(`${backendURL}/lembrete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: `📌 ${title}`,
      body: `${desc}`,
      datetime: datetime
    }),
  });

  console.log('🚀 Notificação enviada pelo backend.');
};

async function refreshReminderList() {
  const lembretes = await fetch(`${backendURL}/lembretes`)
  .then(res => res.json());
  return lembretes
}

window.addEventListener("DOMContentLoaded", () => {
  init();
})