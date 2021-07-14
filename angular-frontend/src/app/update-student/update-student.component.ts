import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  exform: any;
  student: Student =new Student();
  constructor(private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getStudent( this.route.snapshot.paramMap.get('id'));
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

  public getStudent(id:any): void{
    this.studentService.getStudentById(id).subscribe(data =>{
      this.student =data;
      console.log(data);
    }, error => {console.log(error);});
  }

  public onSubmit(){

    this.studentService.updateStudent(this.student).subscribe( data =>{
      this.goToStudentList();
    }, error =>console.log(error));
   

  }
  goToStudentList(){
    this.router.navigate(['']);
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
