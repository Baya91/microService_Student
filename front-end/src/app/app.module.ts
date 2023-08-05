import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';

import { StudentComponent } from './component/body/student/student.component';
import { GestionPageComponent } from './component/body/gestion-page/gestion-page.component';
import { NavbarComponent } from './component/header/navbar/navbar/navbar.component';

const routes:Routes=[
  { path:'' ,  component : StudentComponent},
  // { path:'student/:alfa' ,  component : StudentComponent}======> navigateByUrl 
  { path:'student/:id/name/:alfa' ,  component : StudentComponent}// ======>navigate

]



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentComponent,
    GestionPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
