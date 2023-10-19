import {Component, OnInit} from '@angular/core';
import { Server } from 'src/app/Core/models/server.model';
import { ServerService } from 'src/app/Core/services/server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  servers: Server[] = [];
  allowNewServer = false;
  serverStatus = 'Offline';
  serverNumber: number | null = null;

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.fetchServers();

    setTimeout(() => {
      this.serverStatus = 'Online';
      this.allowNewServer = true;
    }, 2000);
  }

  // Get list of servers
  fetchServers() {
    this.serverService.getServers().subscribe((servers) => {
      this.servers = servers;
    });
  }

  // Create new server
  createServer() {
    // Check if inventoryNumber is not null
    if (this.serverNumber !== null) {
      // Convert this.inventoryNumber to a valid number or use a default value
      const serverNumber = isNaN(this.serverNumber) ? 0 : Number(this.serverNumber);
    
      // Create a new server with serverNumber and serverStatus
      const newServer = new Server(0, serverNumber, 'Created');
    
      this.serverService.addServer(newServer).subscribe((addedServer) => {
        this.servers.push(addedServer);
        this.serverService.updateServers(this.servers);
      });
    }
    
    // Clear the input field
    this.serverNumber = null;
  }

  // Delete server from list
  deleteServer(id: number) {
    this.serverService.deleteServer(id).subscribe(() => {
      this.servers = this.servers.filter((server) => server._id !== id);
      this.serverService.updateServers(this.servers);
    });
  }

}
