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

          const token = localStorage.getItem("token")
          // Envia a inscrição para o backend
          await fetch(`${backendURL}/subscribe`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
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
async function sendReminder(e) {
  e.preventDefault()
  try {
    let title = document.getElementById("input-title").value.trim()
    let desc = document.getElementById("input-desc").value.trim()
    let timeIds = ["date-d", "date-m", "date-y", "date-h", "date-min"]
    let weekCheked = Array.from(document.querySelectorAll(".week-check:checked")).map(iten => parseInt(iten.value))
    if (weekCheked.length < 1) weekCheked = undefined

    let currentTime = new Date()
    let absCurrTime =  Date.now()

    if (!document.getElementById("date-h") || !document.getElementById("date-min")) {
        throw new Error("insira pelo menos os valores de hora e minuto");
      }
    
    let setedTime = timeIds.map(id => {

      let value = document.getElementById(id).value

      if (value == "" && id != "date-h" && id != "date-min") {
        switch (id) {
          case "date-d":
            value = currentTime.getDate()
            break;
          case "date-m":
            value = currentTime.getMonth() + 1
            break;
          case "date-y":
            value = String(currentTime.getFullYear())
          break;
          default:
            break
        }
      }

      if (id == "date-d" && value == currentTime.getDate() && parseInt(`${document.getElementById("date-h").value}${document.getElementById("date-min").value}`) < parseInt(`${currentTime.getHours()}${currentTime.getMinutes()}`)) {
        value = parseInt(value) + 1
      }

      if (id != "date-y") {
        return String(value).padStart(2, "0")
      }

      return value
    })

    let datetimeInIso = `${setedTime[2]}-${setedTime[1]}-${setedTime[0]}T${setedTime[3]}:${setedTime[4]}:00-03:00`

    if (new Date(datetimeInIso).getTime() < absCurrTime) {
      throw new Error("data invalida")
    }

    const token = localStorage.getItem("token")

    await fetch(`${backendURL}/lembrete`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
       },
      body: JSON.stringify({
        title: `📌 ${title}`,
        body: `${desc}`,
        datetime: datetimeInIso,
        hours: `${setedTime[3]}:${setedTime[4]}`,
        week: weekCheked
      }),
    });

    console.log('🚀 Notificação enviada pelo backend.');
  } catch (error) {
    window.alert(error.message)
  }
};

async function getReminderList() {
  const token = localStorage.getItem("token")

  const lembretes = await fetch(`${backendURL}/lembretes`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  .then(res => res.json());
  const sortedLembretes = lembretes.sort((iten, nextIten) => {
    let itenTime = new Date(iten.datetime).getTime()
    let nextItenTime = new Date(nextIten.datetime).getTime()
    return itenTime - nextItenTime
  })
  return sortedLembretes
}

async function rmvReminder(id) {
  const token = localStorage.getItem("token")
  
  await fetch(`${backendURL}/lembrete/${id}`, { 
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    const btn = document.getElementById('notification');
    if (btn) {
      init();
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})