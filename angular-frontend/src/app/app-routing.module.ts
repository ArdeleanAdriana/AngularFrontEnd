import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './pages/create-student/create-student.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { UpdateStudentComponent } from './pages/update-student/update-student.component';

const routes: Routes = [
  {path: '' , component: StudentListComponent},
  {path: 'add' , component:CreateStudentComponent},
  {path: 'edit/:id', component:UpdateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }