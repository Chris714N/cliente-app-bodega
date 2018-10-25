import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
// Pipes
import { OrderModule } from 'ngx-order-pipe';
// componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { InventoryComponent } from './componentes/inventory/inventory.component';
import { ListUserComponent } from './componentes/list-user/list-user.component';
import { EditUserComponent } from './componentes/edit-user/edit-user.component';
import { AddUserComponent } from './componentes/add-user/add-user.component';

// Servicios
import { UserGuard } from './services/user.guards';
import { UserService } from './services/user.service';
import { AdminGuard } from './services/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    InventoryComponent,
    ListUserComponent,
    EditUserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    OrderModule
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
