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
 


  getStudentById$=(id:number):Observable<ApiResponse_<Student>>=>
    this.http.get<any>(`${this.baseUrl}/find?id=${id}`);
 

  getStudentByTxt$=(txt:string="",page:number=0,size:number=10):Observable<ApiResponse_<Student>>=>
     this.http.get<any>(`${this.baseUrl}/find_all?txt=${txt}&page=${page}&size=${size}`);


  saveStudent$=(student:Student,file:File):Observable<ApiResponse_<Student>>=>
  {
  if(file==null){
    student.image=null
   return  this.http.post<any>(`${this.baseUrl}/save`,student);
  }else{ 
  student.image=null;
 const data= this.buildFormData(student,file);
   return  this.http.post<any>(`${this.baseUrl}/save_with_image`,data)
  }

  }
      
  
  
  
  
 
    

  updateStudent$=(student:Student , file: File):Observable<ApiResponse_<Student>>=>{
  if(file==null){

   return  this.http.put<any>(`${this.baseUrl}/update`,student)
  }else{
 const data= this.buildFormData(student,file);
   return  this.http.put<any>(`${this.baseUrl}/update_with_image`,data)
  }

  }
    


  deleteStudent$=(id:number):Observable<ApiResponse_<Student>>=>
     this.http.delete<any>(`${this.baseUrl}/delete?id=${id}`);



     
//////////////////////////////////////////////////////////
public buildFormData(student_: Student , file: File){
   const formData = new FormData();
   student_?.id!=null ? formData.append('id', student_?.id.toString()):"";
   formData.append('name', student_?.name);
   formData.append('lastName', student_?.lastName);
   formData.append('email', student_?.email);
   formData.append('imageUrl', student_?.imageUrl);
   console.log(student_?.imageUrl);
   
   formData.append('genre', student_?.genre);
   formData.append('file',file);
   return formData;
 }
}