import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse_ } from '../model/apiResponse';
import { Student } from '../model/student';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


 constructor(private http:HttpClient) { }


  private baseUrl:string=`${environment.serverUrl}/student`;
 


  getStudentById(id:number):Observable<ApiResponse_<Student>>{
    return this.http.get<any>(`${this.baseUrl}/find?id=${id}`);
  }

  getStudentByTxt(txt:string="",page:number=0,size:number=10):Observable<ApiResponse_<Student>>{
    return this.http.get<any>(`${this.baseUrl}/find_all?txt=${txt}&page=${page}&size=${size}`);
  }

  saveStudent(student:Student):Observable<ApiResponse_<Student>>{
    return this.http.post<any>(`${this.baseUrl}/save`,student);}
    

  updateStudent(student:Student):Observable<ApiResponse_<Student>>{
    return this.http.put<any>(`${this.baseUrl}/update`,student)
  }
    
  deleteStudent(id:number):Observable<ApiResponse_<Student>>{
    return this.http.delete<any>(`${this.baseUrl}/delete?id=${id}`);}
}
