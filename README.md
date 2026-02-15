## Länk till publicerad webbplats
https://reactmoment2.netlify.app/

# MyList – Min "att göra" lista 

Detta repo är för en enkel React-applikation skapad som skoluppgift.  
Applikationen visar en att-göra-lista där data hämtas från ett egenutvecklat API med databas i MongoDB Atlas.


## Tekniker
- React
- TypeScript (TSX)
- CSS
- Vite

## Funktionalitet
- Todos hämtas dynamiskt från ett API
- Varje todo visas i ett eget kort
- Varje todo innehåller:
  - Titel (string)
  - Beskrivning (string)
  - Status (number: 0–2)
- Det går att:
  - Skapa nya todos via formulär
  - Uppdatera status på en todo
  - Radera en todo
- Nya todos visas direkt i listan utan omladdning

## Testa projektet lokalt
1. git clone https://github.com/aner2308/todo-frontend.git
2. cd todo-react-app
3. npm install
4. npm run dev