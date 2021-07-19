
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private baseUrl = `${environment.apiURL}/students`; 
  
  constructor(private httpClient:HttpClient) { }

  public getStudentList(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.baseUrl}`);
  }
 
  public createStudent(student: Student): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, student);
  }

  public getStudentById(id: string): Observable<Student>{
    return this.httpClient.get<Student>(`${this.baseUrl}/${id}`);
  }

  public updateStudent(student:Student, id: number): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,student);
  }

  public deleteStudent (id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}