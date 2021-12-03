import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPhotosComponent } from './list-photos/list-photos.component';
const routes: Routes = [
  {path:"",component:ListPhotosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
