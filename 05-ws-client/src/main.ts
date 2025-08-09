import './style.css';
import { setupCounter } from './counter.ts';
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1> WebSocket Client </h1>
    <input type="text" id=jwt-token placeholder="Enter JWT Token" />
    <button id="connect-button">Connect</button>

    <br />

    <span id="server-status"></span>

    <ul id="clients-list"></ul>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="Type your message here..." />
      <button type="submit">Send</button>
    </form>

    <h3>Messages</h3>
    <ul id="messages-list"></ul>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
const inputJwt = document.querySelector<HTMLInputElement>('#jwt-token')!;
const connectButton = document.querySelector<HTMLButtonElement>('#connect-button')!;
connectButton.addEventListener('click', () => {
  const jwtToken = inputJwt.value.trim();
  if (jwtToken) {
    localStorage.setItem('jwtToken', jwtToken);
    connectToServer(jwtToken);
  } else {
    alert('Please enter a valid JWT token');
  }
});