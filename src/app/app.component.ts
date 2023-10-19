import {Component, OnInit} from '@angular/core';
import { Server } from './Core/models/server.model';
import { ServerService } from './Core/services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  
  servers: Server[] = [];

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    // Subscribe to the servers$ observable
    this.serverService.servers$.subscribe((servers) => {
      this.servers = servers;
    });

    // Load the initial server data
    this.serverService.getServers().subscribe((servers) => {
      this.serverService.updateServers(servers);
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
