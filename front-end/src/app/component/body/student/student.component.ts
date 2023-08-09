import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  startWith,
} from 'rxjs';
import { ApiResponse_ } from 'src/app/model/apiResponse';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  //variable


 
  allStudent:Student[]
  appStateAllStudent:string


  student:Student|any
  appStateStudent:string

  currentPage :number=0;

  txtSearch: string = '';
  typeModal: string;

totalPages:number=0

  typeImage: string[] = [
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/webp',
    'image/jpg',
  ];
  typeGenre: string[] = ['BANNED', 'PENDING', 'ACTIVE'];
  selectedImage: any = null;
formSaveStudent_: FormGroup;


  

  constructor(
    private studentService: StudentService,
    private activateRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe(() => {
      this.testInputSearch(), this.validationForm(null);
    });
  }

  testInputSearch() {
    let result = this.activateRouter.snapshot.paramMap.has('alfa');
    result
      ? (this.txtSearch = this.activateRouter.snapshot.paramMap.get('alfa'))
      : (this.txtSearch = '');

    this.getAllStudent(this.txtSearch);
  }

  getAllStudent(txt?: string, page?: number, size?: number) {
  
     this.studentService
      .getStudentByTxt$(txt, page, size)
      .pipe(
        map((data: ApiResponse_<Student>) => {
          this.currentPage=data.data.page.number;
          this.totalPages=data.data.page.totalPages;

this.allStudent=data.data.page.content
this.appStateAllStudent='APP_LOADED';

          
        }),
        startWith( this.appStateAllStudent='APP_LOADING' ),
        catchError((error: HttpErrorResponse) =>
          of( this.appStateAllStudent="'APP_ERROR'", error )
        )
      ).subscribe();
  }

  convertBytToImage(dataApi: ApiResponse_<Student>): Student[]{
   let i:number=0

    return dataApi.data.page.content;
  }

  next_previous_Page(deriction: string) {
    let index =
      deriction === 'next'
        ? ++this.currentPage 
        : --this.currentPage ;
    this.getAllStudent(this.txtSearch, index);
  }

  findStudentById(id: number) {
    this.selectedImage = null;
     this.studentService.getStudentById$(id).pipe(
      map((data: ApiResponse_<Student>) => {
        this.student = data.data.page;
        
       this.validationForm(this.student);
       this.appStateStudent= 'APP_LOADED' 
       this.showToast( this.appStateStudent )
      }),
      startWith( this.appStateStudent='APP_LOADING' ,this.showToast( this.appStateStudent ) ),
      catchError((error: HttpErrorResponse) =>
        of(this.appStateStudent='APP_ERROR',this.showToast( this.appStateStudent ) ,this.showToast('APP_ERROR')  )
      )
    ).subscribe();
    
  }

  open_modal_update_save_delete(typeModal_: string, id?: number) {
    this.validationForm(null);

    id != null ? this.findStudentById(id) : '';
    this.typeModal = typeModal_;
  }

  gestionImg(
    $event: Event,
    inputFile: HTMLInputElement,
    inputImage: HTMLImageElement
  ) {
    this.selectedImage = (<HTMLInputElement>event.target).files[0];

    if (
      this.selectedImage.size < 612000 &&
      this.typeImage.indexOf(this.selectedImage.type) > -1
    ) {
      inputImage.src = URL.createObjectURL(this.selectedImage);

      //formgroup.controls['image'].setValue = this.selectedImage;
    } else {
      this.selectedImage = null;
    }
  }



  validationForm(std:any) {
   
   
    this.formSaveStudent_ = this.fb.group({
      id: [std?.id],
      imageUrl: [std?.imageUrl],
      name: [
        std?.name,
        [
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      lastName: [
        std?.lastName,
        [
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      image: ['data:image/jpeg;base64,'+std?.image],
      email: [
        std?.email,
        [
          Validators.minLength(3),
          Validators.maxLength(90),
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      genre: [std?.genre, [Validators.required]],
    });
  }

  get name() {
    return this.formSaveStudent_.get('name');
  }
  get lastName() {
    return this.formSaveStudent_.get('lastName');
  }
  get image() {
    return this.formSaveStudent_.get('image');
  }

  get email() {
    return this.formSaveStudent_.get('email');
  }

  get genre() {
    return this.formSaveStudent_.get('genre');
  }

  save_and_update_Student() {
   

    if (confirm('ok')) {
      if (this.typeModal === 'Save') {
        this.studentService
          .saveStudent$(this.formSaveStudent_.value, this.selectedImage)
          .pipe(
            map(() => {
              this.showToast('APP_LOADED'), this.getAllStudent();
            }),
            startWith(this.showToast('APP_LOADING')),
            catchError((error: HttpErrorResponse) =>
              of(error, this.showToast('APP_ERROR'))
            )
          ).subscribe();
      }
      if (this.typeModal === 'Update') {
        this.formSaveStudent_.controls['image'].setValue(this.student.image);
        this.studentService
          .updateStudent$(this.formSaveStudent_.value, this.selectedImage)
          .pipe(
            map(() => {
              this.showToast('APP_LOADED'),
                this.getAllStudent(this.txtSearch, this.currentPage);
            }),
            startWith(this.showToast('APP_LOADING')),
            catchError((error: HttpErrorResponse) =>
              of(error, this.showToast('APP_ERROR'))
            )
          ).subscribe();
      }
      this.typeModal=""
      document.getElementById('resetForSave').click();
      document.getElementById('close_form_save').click();
    }
  }
  deleteStudent(student: Student) {
    this.studentService
      .deleteStudent$(student.id)
      .pipe(
        map(() => {
          this.showToast('APP_LOADED'), this.getAllStudent();
        }),
        startWith(this.showToast('APP_LOADING')),
        catchError((error: HttpErrorResponse) =>
          of(error, this.showToast('APP_ERROR'))
        )
      )
      .subscribe();
    document.getElementById('close_modal_delete').click();
  }

  hiddenTosat: boolean = true;
  bg_toast: string;
  stat_toast: string;
  color_toast: string;
  showToast(typeTosast: string) {
    if (typeTosast == 'APP_LOADED') {
      this.bg_toast = 'bg-success';
      this.stat_toast = 'Successfully ';
      this.color_toast = 'text-success';
    }
    if (typeTosast == 'APP_LOADING') {
      this.bg_toast = 'bg-warning';
      this.stat_toast = 'Warning ';
      this.color_toast = ' text-warning';
    }
    if (typeTosast == 'APP_ERROR') {
      this.bg_toast = 'bg-danger';
      this.stat_toast = 'Error ';
      this.color_toast = 'text-danger';
    }
    this.hiddenTosat = false;

    setTimeout(() => {
      this.hiddenTosat = true;
    }, 1500);
 
  }
}
