import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  selectedImage: any = null;

  

  constructor(
    private studentService: StudentService,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe(() => this.testInputSearch());
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
          console.log(data);
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

  findStudentById(id: number) {
    this.selectedImage = null;
    this.apiResponseStudent$ = this.studentService.getStudentById$(id).pipe(
      map((data: ApiResponse_<Student>) => {
        console.log('getStudent_id ===>', data);

        let student: any = data.data.page;
        const dbImage = 'data:image/jpeg;base64,' + student.image;
        student.image = dbImage;
        return { appData: student, appState: 'APP_LOADED' };
      }),
      startWith({ appState: 'APP_LOADED' }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: "'APP_ERROR'", error })
      )
    );
  }

  open_modal_update_save_delete(typeModal_: string, id?: number) {
    id != null ? this.findStudentById(id) : '';
    this.typeModal = typeModal_;
  }

  deleteStudent(student: Student) {
    this.studentService
      .deleteStudent$(student.id)
      .subscribe((data) => this.getAllStudent());
    document.getElementById('close_modal_delete').click();
  }


  showEvent($event: Event, url: any) {
    this.selectedImage = (<HTMLInputElement>event.target).files[0];
    console.log(this.selectedImage);
    console.log(this.selectedImage.size);
    if (this.selectedImage.size < 612000) {
      url.src = URL.createObjectURL(this.selectedImage);
      console.log(URL.createObjectURL(this.selectedImage));
    } else {
      this.selectedImage = null;
    }
  }

  save_and_update_Student(dataForms: NgForm, idStudent?: number) {
    if (confirm('ok')) {
      if (this.typeModal === 'Save') {
        this.studentService
          .saveStudent$(dataForms.value)
          .subscribe((data) => this.getAllStudent());
        document.getElementById('resetForSave').click();
        document.getElementById('close_form_save').click();
      }
      if (this.typeModal === 'Update') {
        dataForms.value.id = idStudent;

        this.studentService
          .updateStudent$(dataForms.value, this.selectedImage)
          .subscribe((ddata) =>
            this.getAllStudent(this.txtSearch, this.currentPageSubj.value)
          );
        console.log(this.currentPageSubj.value);
        document.getElementById('resetFormUpdate').click();
        document.getElementById('close_form_update').click();
      }
    }
  }
}
