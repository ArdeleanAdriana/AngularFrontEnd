import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  public deletedStudent!: Student ;

  constructor(private studentService:StudentService, private router:Router, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getStudents();
  }


  private getStudents(){
    this.studentService.getStudentList().subscribe(data => {
      this.students = data;
    });
  }

 updateStudent(id: number){
    this.router.navigate(['edit', id]);
  }

  public deleteStudent(id: number){ 
    this.studentService.deleteStudent(id).subscribe(data =>{
      console.log(data);
      this.getStudents();
    }) 
  }

  open(content: any, id: number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.deleteStudent(id);
    }, (reason) => {
      console.log('on close');
    });
  }



}
