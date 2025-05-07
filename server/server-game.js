import { WebSocketServer } from 'ws';

const port = 8081;
const server = new WebSocketServer({ port });

let score = { teamA: 0, teamB: 0 };

let slotTeamA = null;

let slotTeamB = null;

function broadcastScore() {
    const message = JSON.stringify({ type: 'score', data: score });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

wss.on('connection', (ws) => {
    // Invia il punteggio iniziale
    ws.send(JSON.stringify({ type: 'score', data: score }));

    ws.on('message', (message) => {
        const msg = JSON.parse(message);
        if (msg.type === 'slot') {
            if (msg.team === 'A') slotTeamA = 1;
            if (msg.team === 'B') slotTeamB = 1;
        }
        if (slotTeamA && slotTeamB && msg.type === 'increment') {
            if (msg.team === 'A') score.teamA++;
            if (msg.team === 'B') score.teamB++;
            broadcastScore();
        }
    });
});

console.info(`WebSocket server is running on ws://localhost:${port}`);