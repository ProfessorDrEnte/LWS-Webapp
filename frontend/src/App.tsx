import { useEffect, useState, FormEvent } from 'react'

type Paket = {
  id: number
  name: string
  anzahl: number
  erstellt: string
}

function App() {
  const [pakete, setPakete] = useState<Paket[]>([])
  const [name, setName] = useState('')
  const [anzahl, setAnzahl] = useState('')

  useEffect(() => {
    fetchPakete()
  }, [])

  const fetchPakete = async () => {
    const res = await fetch('http://localhost:4000/pakete')
    const data = await res.json()
    setPakete(data)
  }

  const paketHinzufuegen = async (e: FormEvent) => {
    e.preventDefault()

    const res = await fetch('http://localhost:4000/pakete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        anzahl: parseInt(anzahl),
      }),
    })

    if (res.ok) {
      setName('')
      setAnzahl('')
      fetchPakete()
    } else {
      alert('Fehler beim Hinzufügen!')
    }
  }

  // 👇 return kommt ganz am Ende, aber noch innerhalb von function App()
  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📦 Paketliste</h1>

      <form onSubmit={paketHinzufuegen} className="mb-6 space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Paketname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Anzahl"
          value={anzahl}
          onChange={(e) => setAnzahl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ➕ Paket hinzufügen
        </button>
      </form>

      <ul className="space-y-2">
        {pakete.map((paket) => (
          <li
            key={paket.id}
            className="p-4 bg-white rounded-xl shadow-sm flex justify-between items-center"
          >
            <span className="font-medium text-lg">{paket.name}</span>
            <span className="text-sm text-gray-500">
              {paket.anzahl} Stück |{' '}
              {new Date(paket.erstellt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
