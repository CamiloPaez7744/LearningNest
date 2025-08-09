import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClients = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error(`User with ID ${userId} not found`);
    if (!user.isActive) throw new Error(`User with ID ${userId} is not active`);
    this.checkUserConnection(user);
    this.connectedClients[client.id] = { socket: client, user };
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getClients() {
    return Object.keys(this.connectedClients);
  }

  getUserFullName(clientId: string): string {
    const client = this.connectedClients[clientId];
    if (!client) throw new Error(`Client with ID ${clientId} not found`);
    return `${client.user.fullName}`;
  }

  private checkUserConnection(user: User): boolean {
    const clientEntry = Object.entries(this.connectedClients).find(
      ([, client]) => client.user.id === user.id,
    );
    if (clientEntry) {
      const [clientId, client] = clientEntry;
      client.socket.disconnect();
      delete this.connectedClients[clientId];
      return true;
    }
    return false;
  }
}
