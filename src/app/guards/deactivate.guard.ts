import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddEmployeeComponent} from '../add-employee/add-employee.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: AddEmployeeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
