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

  apiResponseAllStudents: Observable<{
    appData?: ApiResponse_<Student>;
    appState: string;
    error?: HttpErrorResponse;
  }>;

  apiResponseStudent$: Observable<{
    appData?: Student;
    appState: string;
    error?: HttpErrorResponse;
  }>;

  currentPageSubj = new BehaviorSubject<number>(0);
  currentPage = this.currentPageSubj.asObservable();

  txtSearch: string = '';
  typeModal: string;

  typeImage:string[]=["image/png", "image/gif", "image/jpeg","image/webp","image/jpg"]
  typeGenre:string[]=["BANNED", "PENDING", "ACTIVE"]
  selectedImage: any = null;

  //// validation

  formSaveStudent_: FormGroup;

  constructor(
    private studentService: StudentService,
    private activateRouter: ActivatedRoute,
    private fb: FormBuilder,
   
    
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
    this.apiResponseAllStudents = this.studentService
      .getStudentByTxt$(txt, page, size)
      .pipe(
        map((data: ApiResponse_<Student>) => {
          this.currentPageSubj.next(data.data.page.number);
         

          return {
            appData: this.convertBytToImage(data),
            appState: 'APP_LOADED',
          };
        }),
        startWith({ appState: 'APP_LOADING' }),
        catchError((error: HttpErrorResponse) =>
          of({ appState: "'APP_ERROR'", error })
        )
      );
  }

  convertBytToImage(dataApi: ApiResponse_<Student>): ApiResponse_<Student> {
    dataApi.data.page.content.map((data: any) => {
      data.image = 'data:image/jpeg;base64,' + data.image;
    });
    return dataApi;
  }

  next_previous_Page(deriction: string) {
    let index =
      deriction === 'next'
        ? this.currentPageSubj.value + 1
        : this.currentPageSubj.value - 1;
    this.getAllStudent(this.txtSearch, index);
  }
  student: any;
  findStudentById(id: number) {
   this.selectedImage=null
    this.apiResponseStudent$ = this.studentService.getStudentById$(id).pipe(
      map((data: ApiResponse_<Student>) => {
        this.student = data.data.page;
        const dbImage = 'data:image/jpeg;base64,' + this.student.image;
        this.student.imageConvert = dbImage;
        console.log(this.student);
        
        this.validationForm(this.student);
        return { appData: this.student, appState: 'APP_LOADED' };
      }),
      startWith({ appState: 'APP_LOADED' }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: "'APP_ERROR'", error })
      )
    );
  }

  open_modal_update_save_delete(typeModal_: string, id?: number) {
    this.validationForm("")
    
    id != null ? this.findStudentById(id) :'';
    this.typeModal = typeModal_;
  }

  gestionImg(
    $event: Event, 
    inputFile: HTMLInputElement,
    inputImage: HTMLImageElement
  ) {
    this.selectedImage = (<HTMLInputElement>event.target).files[0];


    if (this.selectedImage.size < 612000 &&  this.typeImage.indexOf((this.selectedImage.type))>-1) {
      
        inputImage.src = URL.createObjectURL(this.selectedImage);
 
      //formgroup.controls['image'].setValue = this.selectedImage;
    
    } else {
    this.selectedImage = null;
    
    }
  }

  validationForm(std: any) {
    console.log("data ",std);
    
    this.formSaveStudent_ = this.fb.group({
      id: [
        std?.id
      ], 
      imageUrl: [
        std?.imageUrl
      ],
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
      image: [std?.imageConvert],
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

get name(){ return this.formSaveStudent_.get("name")}
get lastName(){ return  this.formSaveStudent_.get("lastName")}
get image(){ return  this.formSaveStudent_.get("image")}

get email(){ return  this.formSaveStudent_.get("email")}

get genre(){ return  this.formSaveStudent_.get("genre")}




save_and_update_Student() {
  console.log(this.formSaveStudent_.value);
  
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
              this.getAllStudent(this.txtSearch, this.currentPageSubj.value);
          }),
          startWith(this.showToast('APP_LOADING')),
          catchError((error: HttpErrorResponse) =>
            of(error, this.showToast('APP_ERROR'))
          )
        ).subscribe();;
    }
  }
}
deleteStudent(student: Student) {
  
  this.studentService
    .deleteStudent$(student.id) .pipe(
      map(() => {
        this.showToast('APP_LOADED'),
           this.getAllStudent();
           console.log('ok');
           
  }),
  startWith(this.showToast('APP_LOADING')),
  catchError((error: HttpErrorResponse) =>
    of(error, this.showToast('APP_ERROR'))
  )
).subscribe();;
  document.getElementById('close_modal_delete').click();
}


  
hiddenTosat:boolean=true
bg_toast:string
stat_toast:string
color_toast:string
showToast (typeTosast:string){
  
 
    
  if(typeTosast=="APP_LOADED"){
this.bg_toast="bg-success";
this.stat_toast="Successfully ";
this.color_toast="text-success";
  } if(typeTosast=="APP_LOADING"){
    this.bg_toast="bg-warning";
    this.stat_toast="Warning ";
    this.color_toast=" text-warning";
  } if(typeTosast=="APP_ERROR"){
this.bg_toast="bg-danger";
  this.stat_toast="Error ";
  this.color_toast="text-danger";
  }
  this.hiddenTosat=false
  
  setTimeout(() => {
    this.hiddenTosat=true
  }, 5000);
  document.getElementById('resetForSave').click();
  document.getElementById('close_form_save').click();
}
}
