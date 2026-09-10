# Qui e ora — La storia a portata di mano

App web di storia italiana geolocalizzata: mostra gli eventi storici
accaduti vicino a dove si trova l'utente.

Sito online: https://quieoralastoria.netlify.app

## Comandi utili

Aprire prima PowerShell nella cartella del progetto:

```
cd C:\Users\39339\Desktop\quieoralastoria
```

| Comando | Cosa fa |
| --- | --- |
| `npm start` | Avvia l'app in locale su http://localhost:3000 (si aggiorna da sola quando salvi un file) |
| `npm test` | Esegue i test automatici |
| `npm run build` | Crea la versione ottimizzata per il sito online, nella cartella `build` |

## Come pubblicare le modifiche

Netlify è collegato a GitHub: ogni `git push` sul ramo `main` aggiorna
il sito online in 2-3 minuti, senza altri comandi.

```
git add .
git commit -m "descrizione della modifica"
git push
```

(Attenzione: in `git add .` c'è uno spazio tra `add` e il punto.)

## Come aggiungere un evento storico

Gli eventi sono **solo** nel file `src/eventi.js`.

1. Copia un blocco `{ ... }` esistente e incollalo **prima** della riga `];`
2. Cambia i valori:
   - `id`: un numero mai usato prima
   - `titolo`, `data`, `luogo`: testo tra virgolette
   - se il testo contiene un apostrofo, usa le virgolette doppie: `"L'imperatore..."`
   - `lat` e `lon`: le coordinate GPS, numeri con il punto (es. `41.8902`)
3. Metti la virgola dopo la parentesi graffa `}` di chiusura
4. Salva il file (Ctrl+S), controlla su http://localhost:3000, poi pubblica

## Struttura del progetto

- `src/App.js` — tutta l'interfaccia dell'app
- `src/eventi.js` — l'elenco degli eventi storici (i dati)
- `src/App.test.js` — i test automatici
- `public/index.html` — titolo della pagina e dati per Google e i social
- `public/manifest.json` — nome e icone quando l'app viene installata sul telefono
