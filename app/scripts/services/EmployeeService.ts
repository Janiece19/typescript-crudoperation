// <reference path="ServiceReference.ts" />

module EmployeeManagement.Services {
    export class EmployeeService extends EmployeeManagement.Services.MainService {
        constructor() {
            super();
        }

        getEmployees<T>(): Promise<T> {
            return this.getByUrl<T>("http://localhost:4000/emp");
        }

        getEmployeeDetails<T>(): Promise<T> {
            return this.getByUrl('http://localhost:4000/emp/details')
        }

        getEmployeeStatus<T>(): Promise<T> {
            return this.getByUrl('http://localhost:4000/emp/status')
        }
        getDepartment<T>(): Promise<T> {
            return this.getByUrl('http://localhost:4000/emp/departments')
        }
    }
}