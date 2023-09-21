import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Server } from '../models/server.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  // API url
  private createUrl = 'http://localhost:3000/api/create';
  private getUrl = 'http://localhost:3000/api/servers';
  private deleteUrl = 'http://localhost:3000/api/servers';


  serversChanged = new Subject<Server[]>();

  constructor(private http: HttpClient) {}

  // Add a server to the list
  addServer(server: Server): Observable<Server> {
    return this.http.post<Server>(this.createUrl, server);
  }

  // Get the list of servers
  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(this.getUrl);
  }

  // Delete a server by its ID
  deleteServer(id: number): Observable<void> {
    const url = `${this.deleteUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // Call this method whenever the list of servers changes
  notifyServersChanged(servers: Server[]) {
    this.serversChanged.next(servers);
  }
}
