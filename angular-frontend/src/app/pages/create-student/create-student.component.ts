import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../student';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})


export class CreateStudentComponent implements OnInit {

  

  exform: any;
  student: Student = new Student();
  constructor(private studentService:StudentService, private router:Router) { }



  ngOnInit(): void {
    this.exform = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'university' : new FormControl (null, Validators.required),
      'phone' : new FormControl (
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      )
    });
  }

  public saveStudent(){
    this.studentService.createStudent(this.student).subscribe(data =>{
      console.log(data);
    }, error => console.log(error));
  }

  public goToStudentList(){
    this.router.navigate(['']);
  }

 public onSubmit(){
    console.log(this.student);
    this.saveStudent();
  }

  get name(){
    return this.exform.get('name');
  }

  get email(){
    return this.exform.get('email');
  }

  get university(){
    return this.exform.get('university');
  }
  
  get phone(){
    return this.exform.get('phone');
  }
}
