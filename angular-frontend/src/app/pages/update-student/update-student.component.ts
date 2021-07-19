import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../model/student';
import { StudentService } from '../../service/student.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})

export class UpdateStudentComponent implements OnInit {
  exform: any;
  currentStudent: Student =new Student();
  
  constructor(private formBuilder: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getStudent( this.route.snapshot.paramMap.get('id'));

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

  public getStudent(id:any): void{
    this.studentService.getStudentById(id).subscribe(data =>{
      this.currentStudent =data;
      this.updateFormValues();
      console.log(data);
    }, error => {console.log(error);});
  }

  updateFormValues() {
    this.exform.patchValue({
    name: this.currentStudent.name,
    email: this.currentStudent.email,
    university: this.currentStudent.university,
    phone: this.currentStudent.phone,
    });
  }

  public onSubmit(){
    if (this.exform.invalid) {
      return;
    }
      
    this.updateStudent();
  }

  goToStudentList(){
    this.router.navigate(['']);
  }

  updateStudent(): void {
    this.currentStudent.name=this.exform.value.name;
    this.currentStudent.email=this.exform.value.email;
    this.currentStudent.phone=this.exform.value.phone;
    this.currentStudent.university=this.exform.value.university;
   
    this.studentService.updateStudent(this.currentStudent, this.currentStudent.id)
    .subscribe(
    response => {
    console.log(response);
    this.goToStudentList();
    },
    error => {
    console.log(error);
    });
  }

}