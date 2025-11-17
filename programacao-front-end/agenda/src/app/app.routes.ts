import { Routes } from '@angular/router';
import { ContatoListComponent } from './components/contato-list/contato-list.component';
import { ContatoEditComponent } from './components/contato-edit/contato-edit';

export const routes: Routes = [
  { path: '', component: ContatoListComponent },
  { path: 'contato/edit', component: ContatoEditComponent }
];
