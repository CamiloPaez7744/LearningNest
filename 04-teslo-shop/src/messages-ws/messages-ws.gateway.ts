import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers['token'];
      let payload: JwtPayload;
      if (typeof token === 'string') {
        payload = this.jwtService.verify<JwtPayload>(token);
      } else {
        throw new Error('Invalid token format');
      }
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      console.error('Error verifying JWT:', error);
      return;
    }
    this.wss.emit('clients-updated', this.messagesWsService.getClients());
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit('clients-updated', this.messagesWsService.getClients());
  }

  @SubscribeMessage('message-from-client')
  handleMessage(client: Socket, payload: NewMessageDto) {
    console.log('Message received:', payload);

    // Only emit to the specific client that sent the message
    // client.emit('message-from-server', {
    //   id: client.id,
    //   message: payload.message,
    // });

    // Broadcast to all clients except the sender
    // client.broadcast.emit('message-from-server', {
    //   id: client.id,
    //   message: payload.message,
    // });

    // Emit to all connected clients
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message,
    });
  }
}
