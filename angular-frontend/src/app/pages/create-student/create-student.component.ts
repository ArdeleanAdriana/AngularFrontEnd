import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})


export class CreateStudentComponent implements OnInit {

  exform: any;
  constructor(private formBuilder:FormBuilder, private studentService:StudentService, private router:Router) { }



  ngOnInit(): void {
    this.exform = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      university : ['', Validators.required],
      phone : ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ]
    });
  }

  get formControls() { return this.exform.controls; }

  saveStudent(): void {
    this.studentService.createStudent(this.exform.value)
    .subscribe(
    response => {
    console.log(response);
    this.goToStudentList();
    },
    error => {
    console.log(error);
    });
  }

  public goToStudentList(){
    this.router.navigate(['']);
  }

 public onSubmit(){

    if (this.exform.invalid) {
      return;
    }
    this.saveStudent();
  }

}