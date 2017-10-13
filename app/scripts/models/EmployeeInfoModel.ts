/// <reference path="ModelReference.ts" />

module EmployeeManagement.Models {

  export class EmployeeInformation {
    id: number;
    firstName: string;
    lastName: string;
    departmentId: number;
    employeeStatus: number;

  }
  export class DepartmentInformation {
    id: number;
    name: string;
  }

  export class EmployeeDetailsInformation {
    id: number;
    employeeId: number;
    joiningDate: number;
    salary: number;
  }

  export class EmployeeStatusInformation {
    id: number;
    name: string;
  }

  export class EmployeeType {
    public fullName: string;
    public deparmentName: string;
    public employeeStatusName: string;
    public empDetails: number | string;
    public joiningDate: string;
    public departmentalId: number;
    public employeeStatusId: number;
    public salary: number;
    public id:number;
  
    
  }
}