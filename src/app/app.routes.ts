import { Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users/users.component';
import { BugsComponent } from './Components/bugs/bugs/bugs.component';
import { BugComponent } from './Components/bugs/bug/bug.component';

export const routes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
    },
    {
        path: 'bugs',
        component: BugsComponent,
    },
    {
        path: 'bug/:id',
        component: BugComponent,
    },
];
