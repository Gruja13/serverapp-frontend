import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Server } from 'src/app/Core/models/server.model';


@Component({
  selector: 'app-server-item',
  templateUrl: './server-item.component.html',
  styleUrls: ['./server-item.component.scss']
})
export class ServerItemComponent {
  @Input()
  server!: Server;
  @Output() 
  deleteClicked = new EventEmitter<number>();

  // Delete server
  onDeleteServer() {
    // Emmit value
    this.deleteClicked.emit(this.server._id);
  }
}
