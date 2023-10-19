import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ServerComponent } from './server.component';
import { ServerService } from 'src/app/Core/services/server.service';
import { of } from 'rxjs';
import { Server } from 'src/app/Core/models/server.model';

describe('ServerComponent', () => {
  let component: ServerComponent;
  let fixture: ComponentFixture<ServerComponent>;
  let serverService: ServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerComponent],
      providers: [ServerService],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(ServerComponent);
    component = fixture.componentInstance;
    serverService = TestBed.inject(ServerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties', () => {
    expect(component.servers).toEqual([]);
    expect(component.allowNewServer).toBeFalse();
    expect(component.serverStatus).toEqual('Offline');
    expect(component.serverNumber).toBeNull();
  });

  it('should fetch servers on initialization', () => {
    const mockServers: Server[] = [
      { _id: 1, serverNumber: 123, serverStatus: 'Created' },
      { _id: 2, serverNumber: 456, serverStatus: 'Created' }
    ];
  
    const getServersSpy = spyOn(serverService, 'getServers').and.returnValue(of(mockServers));
  
    component.ngOnInit();
  
    expect(getServersSpy).toHaveBeenCalled();
  
    expect(component.servers).toEqual(mockServers);
  });

  it('should create a new server', fakeAsync(() => {
    const mockNewServer: Server = {
      _id: 2,
      serverNumber: 456, 
      serverStatus: 'Created'
    };
    
    const addServerSpy = spyOn(serverService, 'addServer').and.returnValue(of(mockNewServer));
  
    component.serverNumber = 456;
    component.createServer();
    tick();
  
    expect(addServerSpy).toHaveBeenCalledWith(jasmine.objectContaining({ serverNumber: 456, serverStatus: 'Created' }));
  
    expect(component.servers).toContain(mockNewServer);
  
    expect(component.serverNumber).toBeNull();
  }));
  
  

  it('should delete a server', fakeAsync(() => {
    const mockServers: Server[] = [
      { _id: 1, serverNumber: 123, serverStatus: 'Created' },
      { _id: 2, serverNumber: 456, serverStatus: 'Created' }
    ];
    component.servers = mockServers;
    
    const deleteServerSpy = spyOn(serverService, 'deleteServer').and.returnValue(of(null as unknown as void)); // Return an empty observable of type void
    
    component.deleteServer(1);
    tick(); 
  
    expect(deleteServerSpy).toHaveBeenCalledWith(1);
  
    expect(component.servers.length).toBe(1);
    expect(component.servers[0]._id).toBe(2);
  }));
});
