import {Component, OnInit} from '@angular/core';
import { Server } from './Core/models/server.model';
import { ServerService } from './Core/services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  servers: Server[] = [];

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    // Load the server data from the service
    this.serverService.getServers().subscribe((servers) => {
      this.servers = servers;
    });

    // Subscribe to changes in the server list
    this.serverService.serversChanged.subscribe((servers: Server[]) => {
      this.servers = servers;
    });
  }

  // Delete server
  deleteServer(serverId: number) {
    this.serverService.deleteServer(serverId).subscribe(() => {
      // Update the list of servers after deletion
      this.servers = this.servers.filter((server) => server._id !== serverId);
    });
  }
}
