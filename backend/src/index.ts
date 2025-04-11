import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'


const prisma = new PrismaClient();
const app = express();
const PORT = 4000;

app.use(express.json()); // 🟢 Wichtig für POST-Requests
app.use(cors())

// GET: Alle Pakete abfragen
app.get('/pakete', async (_req, res) => {
    const pakete = await prisma.paket.findMany();
    res.json(pakete);
});

// POST: Neues Paket anlegen
app.post('/pakete', async (req, res) => {
    const { name, anzahl } = req.body
    const neuesPaket = await prisma.paket.create({
      data: { name, anzahl }
    })
    res.json(neuesPaket)
  })
  
// Root-Route
app.get('/', (_: express.Request, res: express.Response) => {
    res.send('🦭 Moin Moin!');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
