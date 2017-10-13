///<reference path="ComponentReference.ts"/>
module EmployeeManagement.Components {
    import component = EmployeeManagement.Components;
    import models = EmployeeManagement.Models;
    import helper = EmployeeManagement.Helpers;
    import services = EmployeeManagement.Services;
    export class EmployeeInfo {
        public departments: models.DepartmentInformation[];
        employeeStatus: models.EmployeeStatusInformation[];
        employees: models.EmployeeInformation[];
        employeeDetails: models.EmployeeDetailsInformation[];
        results: models.EmployeeType[];
        specificRowId: string
        matchedEmpObj: models.EmployeeType;
        //empArray:models.EmployeeType[];
        addDepartment: () => void;
        constructor() {
            let obj = new services.EmployeeService();
            // departments: models.DepartmentInformation[];
            let p1: Promise<models.DepartmentInformation[]> = obj.getDepartment();
            let p2: Promise<models.EmployeeStatusInformation[]> = obj.getEmployeeStatus();
            let p3: Promise<models.EmployeeInformation[]> = obj.getEmployees();
            let p4: Promise<models.EmployeeDetailsInformation[]> = obj.getEmployeeDetails();
            let addEmployee:EmployeeManagement.Components.AddComponent;
            
             let initializeaddEmployee=()=>{
                 addEmployee=new EmployeeManagement.Components.AddComponent(this.departments,this.employeeStatus,this.employeeDetails);
            }
           

            Promise.all<models.DepartmentInformation[], models.EmployeeStatusInformation[],
                models.EmployeeInformation[], models.EmployeeDetailsInformation[]>([p1, p2, p3, p4]).then((values) => {
                    this.departments = (values[0]);
                    this.employeeStatus = (values[1]);
                    this.employees = (values[2]);//values[2];
                    this.employeeDetails = (values[3]);
                    initializeaddEmployee();
                    this.constructEmployeeDetails(this.departments, this.employeeStatus, this.employees, this.employeeDetails);
                    
                    
                })
                
                

            console.log(this.departments);
            let search = () => {
                this.search();
            }
            helper.AddHelper.showAddForm(false,"addForm");

            let addDepartment = () => {
                helper.AddHelper.showAddForm(true,"addForm");
                helper.AddHelper.showAddForm(false,"btnUpdate");
                // new EmployeeManagement.Components.AddComponent(new models.EmployeeType(), ResultObj, this.departments, this.employeeStatus, this.employeeDetails, this.results);
                let empObj=new models.EmployeeType();
                empObj.id=this.results.length+1;
                addEmployee.save(empObj,ResultObj);
                
            }
            
            let update = () => {
                new EmployeeManagement.Components.EditComponent(new models.EmployeeType(), ResultObj, this.departments, this.employeeStatus, this.employeeDetails, this.specificRowId, this.results);
            }
            let ResultObj = (addResult, indicationFlag) => {
                if (indicationFlag) {
                    this.results.push(addResult);
                    var tableData = helper.HTMLHelper.generateTable(this.results);
                    document.getElementById("showData").innerHTML = tableData;
                    this.bindSelectRowEvents();
                    this.bindDeletetRowEvents();
                }
                else {

                    // this.matchedEmpObj=helper.AddHelper.getupdatedRow(this.results,addResult);
                    // this.results.push(addResult);
                    var tableData = helper.HTMLHelper.generateTable(this.results);
                    document.getElementById("showData").innerHTML = tableData;
                    this.bindSelectRowEvents();
                    this.bindDeletetRowEvents();
                }
            }

            let clear=()=>{
                this.clearSearch();
            }
            let cancel=()=>{
                this.cancel();
            }

            document.getElementById("btnAdd").addEventListener("click", addDepartment);
            document.getElementById("btnUpdate").addEventListener("click", update);
            document.getElementById("filterbtn").addEventListener("click", search);
            document.getElementById("reset").addEventListener("click",clear);
            document.getElementById("btnCancel").addEventListener("click",cancel);
            

            
        }

        constructEmployeeDetails(depts: models.DepartmentInformation[], empStatus: models.EmployeeStatusInformation[], emplyee: models.EmployeeInformation[], empDtl: models.EmployeeDetailsInformation[]): void {
            this.results = emplyee.map((emp: models.EmployeeInformation) => {
                let employeeObj = new models.EmployeeType();
                employeeObj.id = emp.id;
                employeeObj.fullName = emp.firstName + " " + emp.lastName;
                employeeObj.deparmentName = helper.ArrayHelperMethods.getById(depts, emp.departmentId); //getDepartmentNameById(emp.departmentId);
                employeeObj.employeeStatusName = helper.ArrayHelperMethods.getById(empStatus, emp.employeeStatus); //getemployeeStatusNameById(emp.employeeStatus);
                employeeObj.empDetails = helper.ArrayHelperMethods.getEmpDetailsById(empDtl, emp.id);
                employeeObj.joiningDate = helper.ArrayHelperMethods.getJoiningDateById(empDtl, emp.id);
                employeeObj.departmentalId = emp.departmentId;
                employeeObj.employeeStatusId = emp.employeeStatus;
                employeeObj.salary = helper.ArrayHelperMethods.getempBySalary(empDtl, emp.id);
                return employeeObj;
            });
            let deptid = "mydept";
            let statusid = "empStatus";
            let salid = "empSal";
            let ddDeptSecondId = "mydeptsecond";
            let ddStatusid = "empStatussecond";
            let ddSalid = "empSalsecond";
            let tableData = helper.HTMLHelper.generateTable(this.results);
            let selectData = helper.HTMLHelper.generateDropDown(depts, deptid);
            let selectData1 = helper.HTMLHelper.generateDropDown(depts, ddDeptSecondId);
            let statusData = helper.HTMLHelper.generateStatusDropDown(empStatus, statusid);
            let statusData1 = helper.HTMLHelper.generateStatusDropDown(empStatus, ddStatusid);
            let salaryData = helper.HTMLHelper.generateSalaryDropDown(empDtl, salid);
            let salaryData1 = helper.HTMLHelper.generateSalaryDropDown(empDtl, ddSalid);

            document.getElementById("showData").innerHTML = tableData;
            document.getElementById("deptselect").innerHTML = selectData;
            document.getElementById('deptselects').innerHTML = selectData1;
            document.getElementById("statusselect").innerHTML = statusData;
            document.getElementById('statusselects').innerHTML = statusData1;
            document.getElementById("salselect").innerHTML = salaryData;
            document.getElementById('salselects').innerHTML = salaryData1;

            this.bindSelectRowEvents();
            this.bindDeletetRowEvents();

        }

        search() {
            var txtboxname = helper.FilterFunctions.getElementById("myInput", "string");
            var deptmentId = helper.FilterFunctions.getElementById<number>("mydept", "number");
            var employStatus = helper.FilterFunctions.getElementById<number>("empStatus", "number");
            var empSalary = helper.FilterFunctions.getElementById<number>("empSal", "number");
            var joiningDate = helper.FilterFunctions.getElementById<string>("joinDate", "string");

            let searchQuery = [];
            if (txtboxname != "")
                searchQuery.push({ name: "fullName", value: txtboxname });
            if (!isNaN(deptmentId))
                searchQuery.push({ name: "departmentalId", value: deptmentId });
            if (!isNaN(employStatus))
                searchQuery.push({ name: "employeeStatusId", value: employStatus });
            if (!isNaN(empSalary))
                searchQuery.push({ name: "empDetails", value: empSalary });
            if (joiningDate.length > 1) {
                var a = moment(joiningDate).format("YYYY-MM-DD");
                searchQuery.push({ name: "joiningDate", value: a });
            }

            console.log(searchQuery);
            var filteredResult = this.results;
            searchQuery.forEach(function (search) {
                filteredResult = helper.FilterFunctions.getFilterId(filteredResult, search.name, search.value);
            });
            console.log(filteredResult);
            if(filteredResult.length>0){
            var tableData = helper.HTMLHelper.generateTable(filteredResult);
            document.getElementById("showData").innerHTML = tableData;
            }
            else
            document.getElementById("Error").innerHTML="No Record Found";
            var tableData = helper.HTMLHelper.generateTable(filteredResult);
            document.getElementById("showData").innerHTML = tableData;
            this.bindSelectRowEvents();
            this.bindDeletetRowEvents();

        }



        bindSelectRowEvents() {
            let btns = document.getElementsByClassName("selectBtn");
            //let delbtn=document.getElementsByClassName("deletebtn");
            for (let i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", this.showEmployeeRow);
               // delbtn[i].addEventListener("click", this.deleteRow);
                
            }
        }

        bindDeletetRowEvents() {
            
            let delbtn=document.getElementsByClassName("deletebtn");
            for (let i = 0; i <delbtn.length; i++) {
                 delbtn[i].addEventListener("click", this.deleteRow);
                
            }
        }
        // function ResultObj() {
        //     console.log();
        //     var tableData = helper.HTMLHelper.generateTable(this.results);
        //     document.getElementById("showData").innerHTML = tableData;
        // }
        // helper.AddHelper.showAddForm(false);
        // let flag;
        showEmployeeRow = (event) => {
            helper.AddHelper.showAddForm(true,"addForm");
            helper.AddHelper.showAddForm(true,"btnUpdate");
            helper.AddHelper.showAddForm(false,"btnSave");
            this.specificRowId = event.target.parentNode.parentNode.cells[0].textContent;
            let empArray = helper.AddHelper.getByRowId(this.results, parseInt(this.specificRowId));

            (document.getElementById('myInputsecond') as HTMLInputElement).value = empArray.fullName;
            (document.getElementById('mydeptsecond') as HTMLInputElement).value = empArray.departmentalId;
            (document.getElementById('empStatussecond') as HTMLInputElement).value = empArray.employeeStatusId;

            (document.getElementById('empSalsecond') as HTMLInputElement).value = empArray.empDetails;

            (document.getElementById('userjoinDate') as HTMLInputElement).value = empArray.joiningDate;
            // new Components.EditComponent(this.departments,this.employeeStatusempStatusArray,empDetailsArray,clickEvent,this.specificRowId);
        }
         deleteRow=(event)=>{
             alert("Are you sure you want to delete this record?");
            let RowId = event.target.parentNode.parentNode.cells[0].textContent;
          let allDetails= helper.AddHelper.RemoveById(this.results,RowId);
            var tableData = helper.HTMLHelper.generateTable(allDetails);
            document.getElementById("showData").innerHTML = tableData;
            this.bindSelectRowEvents();
            this.bindDeletetRowEvents();
         }

         clearSearch()
         {
            (document.getElementById('myInput') as HTMLInputElement).value="" ;
            (document.getElementById('mydept') as HTMLInputElement).value="" ;
            (document.getElementById('empStatus') as HTMLInputElement).value="";

            (document.getElementById('empSal') as HTMLInputElement).value="";

            (document.getElementById('joinDate') as HTMLInputElement).value="";
            var tableData = helper.HTMLHelper.generateTable(this.results);
            document.getElementById("showData").innerHTML = tableData;
            
            this.bindSelectRowEvents();
            this.bindDeletetRowEvents();
            
         }


         cancel()
         {
             helper.AddHelper.showAddForm(false,"addForm");
            (document.getElementById('myInputsecond') as HTMLInputElement).value = "";
            (document.getElementById('mydeptsecond') as HTMLInputElement).value ="";
            (document.getElementById('empStatussecond') as HTMLInputElement).value = "";

            (document.getElementById('empSalsecond') as HTMLInputElement).value ="";

            (document.getElementById('userjoinDate') as HTMLInputElement).value ="";
            var tableData = helper.HTMLHelper.generateTable(this.results);
            document.getElementById("showData").innerHTML = tableData;
            this.bindSelectRowEvents();
            this.bindDeletetRowEvents();

         }
        

    }
    
}


