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
    const {
      name,
      anzahl,
      empfaenger,
      adresse,
      absender,
      versanddatum,
      barcode,
      foto
    } = req.body
  
    try {
      const neuesPaket = await prisma.paket.create({
        data: {
          name,
          anzahl,
          empfaenger,
          adresse,
          absender,
          versanddatum: new Date(versanddatum), // Konvertierung von String zu Date
          barcode,
          foto,
        }
      })
      res.json(neuesPaket)
    } catch (error) {
      console.error('Fehler beim Anlegen des Pakets:', error)
      res.status(500).json({ error: 'Serverfehler beim Anlegen des Pakets.' })
    }
  })
  
  
// Root-Route
app.get('/', (_: express.Request, res: express.Response) => {
    res.send('🦭 Moin Moin!');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
