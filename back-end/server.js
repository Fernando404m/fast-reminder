import express from 'express';
import cors from 'cors';
import webpush from 'web-push';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let subscriptions = [];

webpush.setVapidDetails(
  'mailto:seu-email@email.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Inscrição salva com sucesso.' });
});

app.post('/send-notification', async (req, res) => {
  const { title, body } = req.body;

  const payload = JSON.stringify({
    title,
    body
  });

  const sendAll = subscriptions.map(sub =>
    webpush.sendNotification(sub, payload).catch(err => {
      console.error('Erro ao enviar para um cliente:', err);
    })
  );

  await Promise.all(sendAll);

  res.json({ message: 'Notificações enviadas.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
