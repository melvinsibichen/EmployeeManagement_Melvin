import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // API endpoint for employee data
  private apiUrl = 'http://localhost:3000/employees';
  // Default HR credentials
  private hrCredentials = { username: 'hr', password: 'hr123' };
  // Array to store employee credentials fetched from the server
  private employeeCredentials: any[] = [];
  // ID of the currently logged-in employee
  private loggedInEmployeeId: number | null = null;

  constructor(private http: HttpClient) {
    // Fetch employee credentials from the server (db.json)
    this.http
      .get<any[]>(this.apiUrl)
      .subscribe((employees) => {
        // Map the fetched data to the employeeCredentials array
        this.employeeCredentials = employees.map((employee) => ({
          id: employee.id,
          username: employee.username,
          password: employee.password,
        }));
      });
  }

  // login logic
  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((employees) => {
        // Check if the provided credentials match HR credentials
        if (
          username === this.hrCredentials.username &&
          password === this.hrCredentials.password
        ) {
          // Set role to 'hr' in localStorage
          localStorage.setItem('role', 'hr');
          return true;
        }

        // Check if the provided credentials match any employee's credentials
        const employee = employees.find(
          (emp) => emp.username === username && emp.password === password
        );

        if (employee) {
          // Set role to 'employee' and store employee ID in localStorage
          localStorage.setItem('role', 'employee');
          //converting id to string ,since it is returned as string otherwise their will be mismach in using number as storing in local storage.
          localStorage.setItem('employeeId', employee.id.toString());
          return true;// Successful login
        }

        console.log('Authentication failed. Returning false.');
        return false;// Authentication failed
      })
    );
  }

  // Get the role of the currently logged-in user or hr
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  // Check if the user is currently logged in else move to login page using auth guard
  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }
  // Get the ID of the currently logged-in employee from localStorage
  getLoggedInEmployeeId(): string | null {
    return localStorage.getItem('employeeId');
  }
  // Logout function to clear role and employee ID from localStorage
  logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('employeeId');
  }

}