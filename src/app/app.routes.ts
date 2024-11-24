import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { FavoritesJobsListComponent } from './components/favorites-jobs-list/favorites-jobs-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' }, // Redirection vers la liste des jobs par défaut
  { path: 'jobs', component: JobListComponent }, // Liste des tous les jobs
  { path: 'favorites', component: FavoritesJobsListComponent }, // Liste des jobs préférés
  { path: 'jobs/:jobId', component: JobDetailsComponent }, // Détails d'un job
];
