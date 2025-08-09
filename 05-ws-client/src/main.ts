import './style.css';
import { setupCounter } from './counter.ts';
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1> WebSocket Client </h1>

    <span id="server-status"></span>

    <ul id="clients-list"></ul>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="Type your message here..." />
      <button type="submit">Send</button>
    </form>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
connectToServer();