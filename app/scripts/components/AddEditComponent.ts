/// <reference path="ComponentReference.ts" />

module EmployeeManagement.Components {
    import models = EmployeeManagement.Models;
    import component = EmployeeManagement.Components;
    import helper = EmployeeManagement.Helpers;

    export class AddComponent {
        matchedEmpObj: models.EmployeeType;
        save:(employObj:models.EmployeeType,clickEvent:Function)=>any;
        private addEvent:Function;
        constructor( public departmentArray: models.DepartmentInformation[], public empStatusArray: models.EmployeeStatusInformation[],
            public empDetailsArray: models.EmployeeDetailsInformation[]) {
                let empDetails: models.EmployeeType;
                this.save = saveButton;
            let save = () => {
                //this.saveEmployee(departmentArray, empStatusArray, empDetailsArray, clickEvent)

                //this.empObj.id = (this.result.length = this.result.length + 1);
                empDetails.fullName = helper.FilterFunctions.getElementById('myInputsecond', "string");
                empDetails.departmentalId = helper.FilterFunctions.getElementById<number>('mydeptsecond', "number");
                empDetails.employeeStatusId = helper.FilterFunctions.getElementById<number>('empStatussecond', "number");
                empDetails.deparmentName = helper.ArrayHelperMethods.getById(departmentArray, empDetails.departmentalId);
                empDetails.employeeStatusName = helper.ArrayHelperMethods.getById(empStatusArray, empDetails.employeeStatusId);
    
                // let employeeId = parseInt(document.getElementById('empid').value);
                //let enteredempid = parseInt(document.getElementById('empSalsecond').value);
                empDetails.empDetails = helper.FilterFunctions.getElementById('empSalsecond', "number");
                empDetails.salary = helper.ArrayHelperMethods.getempBySalary(empDetailsArray, empDetails.empDetails);
                empDetails.joiningDate = helper.FilterFunctions.getElementById('userjoinDate', "string");
                // clickEvent(empDetails, true);
                this.addEvent(empDetails,true);
                helper.AddHelper.showAddForm(false,"addForm");
                helper.AddHelper.showAddForm(false,"btnUpdate");
            }


            document.getElementById("btnSave").addEventListener("click", save);


            function saveButton(result: models.EmployeeType, event: Function) {
                this.addEvent = event;
                empDetails = result;
            }

        }

        // saveEmployee(departmentArray, empStatusArray, empDetailsArray, clickEvent) {
            //let empObject =new component.EmployeeInfo();
            // this.empObj.id = (this.result.length = this.result.length + 1);
            // this.empObj.fullName = helper.FilterFunctions.getElementById('myInputsecond', "string");
            // this.empObj.departmentalId = helper.FilterFunctions.getElementById<number>('mydeptsecond', "number");
            // this.empObj.employeeStatusId = helper.FilterFunctions.getElementById<number>('empStatussecond', "number");
            // this.empObj.deparmentName = helper.ArrayHelperMethods.getById(departmentArray, this.empObj.departmentalId);
            // this.empObj.employeeStatusName = helper.ArrayHelperMethods.getById(empStatusArray, this.empObj.employeeStatusId);

            // // let employeeId = parseInt(document.getElementById('empid').value);
            // //let enteredempid = parseInt(document.getElementById('empSalsecond').value);
            // this.empObj.empDetails = helper.FilterFunctions.getElementById('empSalsecond', "number");
            // this.empObj.salary = helper.ArrayHelperMethods.getempBySalary(empDetailsArray, this.empObj.empDetails);
            // this.empObj.joiningDate = helper.FilterFunctions.getElementById('userjoinDate', "string");
            // clickEvent(this.empObj, true);
            // helper.AddHelper.showAddForm(false,"addForm");
            // helper.AddHelper.showAddForm(false,"btnUpdate");


        //}
    }

    export class EditComponent {
        matchedEmpObj:models.EmployeeType;
        constructor(public empObj:models.EmployeeType, clickevent:Function, department:models.DepartmentInformation[], empStatus:models.EmployeeStatusInformation[], empDetails:models.EmployeeDetailsInformation[], public rowId, public result) {
            this.updateEmployee(empObj, clickevent, department, empStatus, empDetails, rowId, result);
             

            
            
        }
        updateEmployee(empObj, clickevent, department, empStatus, empDetails, rowId, result) {

            this.matchedEmpObj = helper.AddHelper.getupdatedRow(result, rowId);
            this.matchedEmpObj.id = parseInt(this.rowId);
            this.matchedEmpObj.fullName = helper.FilterFunctions.getElementById('myInputsecond', "string");
            this.matchedEmpObj.departmentalId = helper.FilterFunctions.getElementById<number>('mydeptsecond', "number");
            this.matchedEmpObj.employeeStatusId = helper.FilterFunctions.getElementById<number>('empStatussecond', "number");
            this.matchedEmpObj.deparmentName = helper.ArrayHelperMethods.getById(department, this.matchedEmpObj.departmentalId);
            this.matchedEmpObj.employeeStatusName = helper.ArrayHelperMethods.getById(empStatus, this.matchedEmpObj.employeeStatusId);

            // let employeeId = parseInt(document.getElementById('empid').value);
            //let enteredempid = parseInt(document.getElementById('empSalsecond').value);
            this.matchedEmpObj.empDetails = helper.FilterFunctions.getElementById('empSalsecond', "number");
            this.matchedEmpObj.salary = helper.ArrayHelperMethods.getempBySalary(empDetails, this.matchedEmpObj.empDetails);
            this.matchedEmpObj.joiningDate = helper.FilterFunctions.getElementById('userjoinDate', "string");
            clickevent(this.matchedEmpObj, false);
        }

        // bindDeletetRowEvents() {
            
        //     let delbtn=document.getElementsByClassName("deletebtn");
        //     for (let i = 0; (i <delbtn.length); i++) {
        //          delbtn[i].addEventListener("click", this.deleteRow);
                
        //     }
        // }

        // deleteRow=(event)=>{
        //     let RowId = event.target.parentNode.parentNode.cells[0].textContent;
        //     this.result.splice(((parseInt(RowId))-1),1);
 
        //      }

       
        }

    }



