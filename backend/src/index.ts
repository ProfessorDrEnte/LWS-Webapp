import express from 'express';

const app = express();
const PORT = 4000;

app.get('/', (_: express.Request, res: express.Response) => {
    res.send('🦭 Moin Moin!');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
