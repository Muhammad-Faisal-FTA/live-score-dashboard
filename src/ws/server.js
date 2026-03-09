import { WebSocketServer } from 'ws';
function sendJson(websocket, data){
    if(websocket.readyState != websocket.OPEN){
        console.log("WebSocket is not open");
        return;
    }
    websocket.send(JSON.stringify(data));
}

function broadCast(wss, data){
    for(const client of wss.clients){
        if(client.readyState != WebSocket.OPEN){
            return;
    }

    client.send(JSON.stringify(data));
}}

export function attachWebSocketServer(server){
    const wss = new WebSocketServer({ 
        server,
        path: '/ws',
        maxPayload: 1024 * 1024, // 1MB 
     });

    server.on('connection', (ws) => {
        sendJson(ws, { message: 'Welcome to the WebSocket server!' });
        console.log('WebSocket client connected');
    })

    server.on('error', error => {
        console.error('WebSocket error:', error.message);
    })

    function broadCastStarted(match){
        broadCast(wss, { event: 'matchStarted', match });
    }

    return { broadCastStarted };


}