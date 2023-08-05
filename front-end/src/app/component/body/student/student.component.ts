
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiResponse_ } from "src/app/model/apiResponse";
import { Student } from "src/app/model/student";
import { StudentService } from "src/app/service/student.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"],
})
export class StudentComponent implements OnInit {



 apiResponse:ApiResponse_<Student>;
 student: Student;
  txtSearch: string = "";
  typeModal: string;
  indexPage:number

  constructor(
    private studentService: StudentService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
   this.activateRouter.paramMap.subscribe(()=>  this.testInputSearch())
 //this.apiResponse.data.page.totalPages
  }

  testInputSearch(){
    let result = this.activateRouter.snapshot.paramMap.has("alfa");
      result
        ? (this.txtSearch = this.activateRouter.snapshot.paramMap.get("alfa"))
        : (this.txtSearch = "");
        console.log(" this.testInputSearch();");
        
        this.getAllStudent(this.txtSearch);
  }


  getAllStudent(txt?:string,page?:number,size?:number) {
   
    this.indexPage=page;
    this.studentService.getStudentByTxt(txt,page,size).subscribe((data) => {
      this.apiResponse = data;
      console.log(data);
      
    });
  }


next_previous_Page(txtSearch_:string,deriction:string , index_:number){
deriction==="next"? ++index_: --index_;
this.getAllStudent(txtSearch_,index_)

}


  

  findStudentById(id: number) {
    let data_: any;
    this.studentService
      .getStudentById(id)
      .subscribe((data: ApiResponse_<Student>) => {
        data_ = data.data.page;
        this.student = data_;
      });
  }

 



  open_modal_update_save_delete(typeModal_: string, id?: number) {
    id != null ? this.findStudentById(id) : "";
    this.typeModal = typeModal_;
  }



  deleteStudent(student: Student) {
    this.studentService
      .deleteStudent(student.id)
      .subscribe((data) => this.getAllStudent());
    document.getElementById("close_modal_delete").click();
  }

  save_and_update_Student(dataForms: any, idStudent?: number) {
    if (this.typeModal === "Save" && confirm("ok")) {
      this.studentService
        .saveStudent(dataForms.value)
        .subscribe((data) => this.getAllStudent());
      document.getElementById("close_form").click();
    }
    if (this.typeModal === "Update" && confirm("ok")) {
      dataForms.value.id = idStudent;
      this.studentService
        .updateStudent(dataForms.value)
        .subscribe((ddata) => this.getAllStudent());
      document.getElementById("close_form").click();
    }

  }
}
