import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// componentes
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { InventoryComponent } from './componentes/inventory/inventory.component';
import { ListUserComponent } from './componentes/list-user/list-user.component';
// Servicios
import { UserGuard } from './services/user.guards';
import { AdminGuard } from './services/admin.guard';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inventory', component: InventoryComponent, canActivate: [UserGuard]},
    {path: 'users', component: ListUserComponent, canActivate: [AdminGuard]},
    {path: '**', component: HomeComponent, canActivate: [UserGuard]}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
