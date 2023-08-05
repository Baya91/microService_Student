import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router :Router, private activateRoute: ActivatedRoute) { }


  ngOnInit(): void { 

   
  }

  searchStudent(txtSearch:string){
    this.router.navigate(['/student',20,"name",txtSearch]);
  
  
}
}
