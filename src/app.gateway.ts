import {
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(3001)
export class AppGateway implements OnGatewayInit, OnGatewayConnection {
  afterInit() {
    console.log('init wss');
  }

  handleConnection(client) {
    console.log('handling connection...');
    client.emit('connection', 'connected to websocket');
  }

  @WebSocketServer()
  wss;
}
