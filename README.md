# Gerardo Iuliano · Academic website

Sito statico per GitHub Pages. Il catalogo è generato nel browser da `publications.json`.

## Aggiungere una pubblicazione

1. Copia il PDF in `assets/publications/`.
2. Aggiungi un oggetto all’elenco in `publications.json`. In `paper` scrivi il nome esatto del file, inclusi spazi e maiuscole.
3. Salva JSON e PDF insieme nel repository quando pubblichi l’aggiornamento.

```json
{
  "title": "Example publication",
  "authors": ["Gerardo Iuliano", "Coauthor Name"],
  "year": 2026,
  "type": "Conference",
  "venue": "Conference name",
  "rank": "",
  "track": "Research Track",
  "location": "City, Country",
  "paper": "Example publication.pdf",
  "reference": "https://example.org/publication"
}
```

I campi obbligatori sono `title`, `year` (numero intero) e `type` (ad esempio `Conference`, `Journal`, `Workshop` o `Preprint`). Gli altri campi possono essere omessi o lasciati vuoti quando non si applicano. `reference` accetta un URL HTTPS, ad esempio il DOI o la pagina ufficiale. Le pubblicazioni sono ordinate per anno decrescente. A parità di anno vale l’ordine del JSON.

## Anteprima locale

Dalla radice del repository, esegui `python3 -m http.server 8000` e apri [l’anteprima](http://localhost:8000). La pagina legge il JSON tramite HTTP.

Il sito originale era basato su [Cleanfolio Minimal](https://github.com/rajshekhar26/cleanfolio-minimal). La licenza è in `LICENSE`.
