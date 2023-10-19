import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerItemComponent } from './server-item.component';
import { Server } from 'src/app/Core/models/server.model';

describe('ServerItemComponent', () => {
  let component: ServerItemComponent;
  let fixture: ComponentFixture<ServerItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerItemComponent],
    });

    fixture = TestBed.createComponent(ServerItemComponent);
    component = fixture.componentInstance;

    const serverId = 123;
    component.server = {
      _id: serverId,
      serverNumber: 456,
      serverStatus: 'Created',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteClicked event with the server ID when onDeleteServer is called', () => {
    const serverId = 123;
    const deleteClickedSpy = spyOn(component.deleteClicked, 'emit');

    component.onDeleteServer();

    expect(deleteClickedSpy).toHaveBeenCalledWith(serverId);
  });
});
