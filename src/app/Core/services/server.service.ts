import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Server } from '../models/server.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  // API url
  private createUrl = 'serverapp-backend.vercel.app/api/create';
  private getUrl = 'serverapp-backend.vercel.app/api/servers';
  private deleteUrl = 'serverapp-backend.vercel.app/api/servers';


  private serversSubject = new BehaviorSubject<Server[]>([]);
  servers$ = this.serversSubject.asObservable();

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

  // Call this method to update the servers of servers changes
  updateServers(servers: Server[]) {
    this.serversSubject.next(servers);
  }
}
