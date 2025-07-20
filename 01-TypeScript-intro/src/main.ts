import './style.css'
import { name, age } from './bases/01-types.ts'
import { Pokemon, pokemonList } from './bases/03-classes.ts'
// import { Pokemon } from './bases/05-decorators.ts'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />

      <p>Pokemon List:</p>
      <ul>
        ${pokemonList.map(pokemon => `<li>${pokemon.name}</li>`).join('')}
      </ul>
    </a>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
