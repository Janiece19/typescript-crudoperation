var EmployeeManagement;
(function (EmployeeManagement) {
    var Services;
    (function (Services) {
        class MainService {
            constructor() {
            }
            getByUrl(url) {
                return new Promise(function (resolve, reject) {
                    let req = new XMLHttpRequest();
                    req.open('GET', url);
                    req.onload = function () {
                        if (req.status == 200) {
                            resolve(JSON.parse(req.response));
                        }
                        else {
                            reject(Error(req.statusText));
                        }
                    };
                    req.send();
                });
            }
        }
        Services.MainService = MainService;
    })(Services = EmployeeManagement.Services || (EmployeeManagement.Services = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Services;
    (function (Services) {
        class EmployeeService extends EmployeeManagement.Services.MainService {
            constructor() {
                super();
            }
            getEmployees() {
                return this.getByUrl("http://localhost:4000/emp");
            }
            getEmployeeDetails() {
                return this.getByUrl('http://localhost:4000/emp/details');
            }
            getEmployeeStatus() {
                return this.getByUrl('http://localhost:4000/emp/status');
            }
            getDepartment() {
                return this.getByUrl('http://localhost:4000/emp/departments');
            }
        }
        Services.EmployeeService = EmployeeService;
    })(Services = EmployeeManagement.Services || (EmployeeManagement.Services = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Models;
    (function (Models) {
        class EmployeeInformation {
        }
        Models.EmployeeInformation = EmployeeInformation;
        class DepartmentInformation {
        }
        Models.DepartmentInformation = DepartmentInformation;
        class EmployeeDetailsInformation {
        }
        Models.EmployeeDetailsInformation = EmployeeDetailsInformation;
        class EmployeeStatusInformation {
        }
        Models.EmployeeStatusInformation = EmployeeStatusInformation;
        class EmployeeType {
        }
        Models.EmployeeType = EmployeeType;
    })(Models = EmployeeManagement.Models || (EmployeeManagement.Models = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Helpers;
    (function (Helpers) {
        class ArrayHelperMethods {
            static getById(array, id) {
                let selectedItem = array.find((item) => {
                    return item.id === id;
                });
                if (selectedItem) {
                    return selectedItem.name;
                }
                else {
                    return "NA";
                }
            }
            static getEmpDetailsById(array, id) {
                let selectedEmployee = array.find((empdtl) => {
                    return empdtl.employeeId === id;
                });
                if (selectedEmployee)
                    return selectedEmployee.employeeId;
                else
                    return "NA";
            }
            static getJoiningDateById(array, id) {
                let selectedEmployee = array.find((i) => i.employeeId === id);
                if (selectedEmployee) {
                    let joinDate = selectedEmployee.joiningDate;
                    let formattedDate = moment(joinDate).format("YYYY-MM-DD");
                    return formattedDate;
                }
                else {
                    return "NA";
                }
            }
            static getempBySalary(salary, id) {
                let empsal = salary.find((item) => {
                    return item.employeeId == id;
                });
                if (empsal) {
                    return empsal.salary;
                }
                return null;
            }
        }
        Helpers.ArrayHelperMethods = ArrayHelperMethods;
        class FilterFunctions {
            static getElementById(elementId, returnType) {
                let selectedElement = document.getElementById(elementId);
                if (selectedElement) {
                    if (returnType === "number") {
                        let convertToInteger = parseInt(selectedElement.value);
                        return convertToInteger;
                    }
                    else {
                        return selectedElement.value;
                    }
                }
            }
            static validateName(array, name) {
                array.filter((item) => {
                    if (item.fullName.includes(name))
                        alert(name + "already exists");
                });
            }
            static getFilterId(array, propertyName, propertyValue) {
                return array.filter((array) => {
                    if (isNaN(propertyValue)) {
                        var lowerPropertyValue = propertyValue.toLowerCase();
                        var arr = (array[propertyName]).toLowerCase();
                        return arr.includes(lowerPropertyValue);
                    }
                    else if (!isNaN(propertyValue)) {
                        return array[propertyName] == propertyValue;
                    }
                    else {
                        return array[propertyName] === propertyValue;
                    }
                });
            }
        }
        Helpers.FilterFunctions = FilterFunctions;
    })(Helpers = EmployeeManagement.Helpers || (EmployeeManagement.Helpers = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Helpers;
    (function (Helpers) {
        class AddHelper {
            static showAddForm(visibilityFlag, txtid) {
                let addForm = document.getElementById(txtid);
                if (visibilityFlag) {
                    addForm.style.visibility = "visible";
                }
                else {
                    addForm.style.visibility = "hidden";
                }
            }
            static getByRowId(array, id) {
                let selectedItem = array.find((item) => {
                    return item.id === id;
                });
                if (selectedItem) {
                    return selectedItem;
                }
                else
                    return null;
            }
            static getupdatedRow(mainArray, id) {
                let selectedItem = mainArray.find((item) => {
                    return (item.id === parseInt(id));
                });
                if (selectedItem) {
                    return (selectedItem);
                }
                else
                    return null;
            }
            static RemoveById(array, id) {
                let index;
                let selectedItem = array.filter((item) => {
                    return item.id === parseInt(id);
                });
                for (let i = 0; i < selectedItem.length; i++) {
                    index = array.indexOf(selectedItem[i]);
                    array.splice(index, 1);
                }
                return array;
            }
        }
        Helpers.AddHelper = AddHelper;
    })(Helpers = EmployeeManagement.Helpers || (EmployeeManagement.Helpers = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Helpers;
    (function (Helpers) {
        class HTMLHelper {
            static generateTable(array) {
                if (array && array.length === 0) {
                    return "";
                }
                let htmlContent = "<table border='1' style='width:100%'>";
                let tableHeaders = Object.keys(array[0]);
                tableHeaders.push("action");
                let headerContent = "<tr>";
                tableHeaders.forEach((header) => {
                    headerContent += "<th>" + header + "</th>";
                });
                headerContent += "</tr>";
                let tableBody = "";
                array.forEach((item) => {
                    tableBody += "<tr class='empRowSelect'>";
                    let i = 0;
                    tableHeaders.forEach((th) => {
                        if (i < 9) {
                            tableBody += "<th>" + item[th] + "</th>";
                            ++i;
                        }
                        else
                            tableBody += "<th><input type='button' class='selectBtn' value='Select' /><input type='button' class='deletebtn' value='Delete'/></th>";
                    });
                    tableBody += "</tr>";
                });
                htmlContent += headerContent + tableBody + "</table>";
                return htmlContent;
            }
            static generateDropDown(deptments, tagid) {
                if (deptments && deptments.length === 0) {
                    return "";
                }
                var htmlContent = "<select id=" + tagid + ">";
                var selected = "<option selected></option>";
                var selectContent = "";
                deptments.forEach(function (item) {
                    selectContent += '<option value=' + item.id + ">" + item.name + "</option>";
                });
                selectContent += "</select>";
                htmlContent += selected + selectContent;
                return htmlContent;
            }
            static generateStatusDropDown(status, tagid) {
                if (status && status.length === 0) {
                    return "";
                }
                var htmlContent = "<select id=" + tagid + ">";
                var selected = "<option selected></option>";
                var selectContent = "";
                status.forEach(function (item) {
                    selectContent += '<option value=' + item.id + ">" + item.name + "</option>";
                });
                selectContent += "</select>";
                htmlContent += selected + selectContent;
                return htmlContent;
            }
            static generateSalaryDropDown(salary, id) {
                if (salary && salary.length === 0) {
                    return "";
                }
                var htmlContent = "<select id=" + id + ">";
                var selected = "<option selected></option>";
                var selectContent = "";
                salary.forEach(function (item) {
                    selectContent += '<option value=' + item.employeeId + ">" + item.salary + "</option>";
                });
                selectContent += "</select>";
                htmlContent += selected + selectContent;
                return htmlContent;
            }
        }
        Helpers.HTMLHelper = HTMLHelper;
    })(Helpers = EmployeeManagement.Helpers || (EmployeeManagement.Helpers = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Components;
    (function (Components) {
        var models = EmployeeManagement.Models;
        var helper = EmployeeManagement.Helpers;
        var services = EmployeeManagement.Services;
        class EmployeeInfo {
            constructor() {
                this.showEmployeeRow = (event) => {
                    helper.AddHelper.showAddForm(true, "addForm");
                    helper.AddHelper.showAddForm(true, "btnUpdate");
                    helper.AddHelper.showAddForm(false, "btnSave");
                    this.specificRowId = event.target.parentNode.parentNode.cells[0].textContent;
                    let empArray = helper.AddHelper.getByRowId(this.results, parseInt(this.specificRowId));
                    document.getElementById('myInputsecond').value = empArray.fullName;
                    document.getElementById('mydeptsecond').value = empArray.departmentalId;
                    document.getElementById('empStatussecond').value = empArray.employeeStatusId;
                    document.getElementById('empSalsecond').value = empArray.empDetails;
                    document.getElementById('userjoinDate').value = empArray.joiningDate;
                };
                this.deleteRow = (event) => {
                    alert("Are you sure you want to delete this record?");
                    let RowId = event.target.parentNode.parentNode.cells[0].textContent;
                    let allDetails = helper.AddHelper.RemoveById(this.results, RowId);
                    var tableData = helper.HTMLHelper.generateTable(allDetails);
                    document.getElementById("showData").innerHTML = tableData;
                    this.bindSelectRowEvents();
                    this.bindDeletetRowEvents();
                };
                let obj = new services.EmployeeService();
                let p1 = obj.getDepartment();
                let p2 = obj.getEmployeeStatus();
                let p3 = obj.getEmployees();
                let p4 = obj.getEmployeeDetails();
                let addEmployee;
                let initializeaddEmployee = () => {
                    addEmployee = new EmployeeManagement.Components.AddComponent(this.departments, this.employeeStatus, this.employeeDetails);
                };
                Promise.all([p1, p2, p3, p4]).then((values) => {
                    this.departments = (values[0]);
                    this.employeeStatus = (values[1]);
                    this.employees = (values[2]);
                    this.employeeDetails = (values[3]);
                    initializeaddEmployee();
                    this.constructEmployeeDetails(this.departments, this.employeeStatus, this.employees, this.employeeDetails);
                });
                console.log(this.departments);
                let search = () => {
                    this.search();
                };
                helper.AddHelper.showAddForm(false, "addForm");
                let addDepartment = () => {
                    helper.AddHelper.showAddForm(true, "addForm");
                    helper.AddHelper.showAddForm(false, "btnUpdate");
                    let empObj = new models.EmployeeType();
                    empObj.id = this.results.length + 1;
                    addEmployee.save(empObj, ResultObj);
                };
                let update = () => {
                    new EmployeeManagement.Components.EditComponent(new models.EmployeeType(), ResultObj, this.departments, this.employeeStatus, this.employeeDetails, this.specificRowId, this.results);
                };
                let ResultObj = (addResult, indicationFlag) => {
                    if (indicationFlag) {
                        this.results.push(addResult);
                        var tableData = helper.HTMLHelper.generateTable(this.results);
                        document.getElementById("showData").innerHTML = tableData;
                        this.bindSelectRowEvents();
                        this.bindDeletetRowEvents();
                    }
                    else {
                        var tableData = helper.HTMLHelper.generateTable(this.results);
                        document.getElementById("showData").innerHTML = tableData;
                        this.bindSelectRowEvents();
                        this.bindDeletetRowEvents();
                    }
                };
                let clear = () => {
                    this.clearSearch();
                };
                let cancel = () => {
                    this.cancel();
                };
                document.getElementById("btnAdd").addEventListener("click", addDepartment);
                document.getElementById("btnUpdate").addEventListener("click", update);
                document.getElementById("filterbtn").addEventListener("click", search);
                document.getElementById("reset").addEventListener("click", clear);
                document.getElementById("btnCancel").addEventListener("click", cancel);
            }
            constructEmployeeDetails(depts, empStatus, emplyee, empDtl) {
                this.results = emplyee.map((emp) => {
                    let employeeObj = new models.EmployeeType();
                    employeeObj.id = emp.id;
                    employeeObj.fullName = emp.firstName + " " + emp.lastName;
                    employeeObj.deparmentName = helper.ArrayHelperMethods.getById(depts, emp.departmentId);
                    employeeObj.employeeStatusName = helper.ArrayHelperMethods.getById(empStatus, emp.employeeStatus);
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
                var deptmentId = helper.FilterFunctions.getElementById("mydept", "number");
                var employStatus = helper.FilterFunctions.getElementById("empStatus", "number");
                var empSalary = helper.FilterFunctions.getElementById("empSal", "number");
                var joiningDate = helper.FilterFunctions.getElementById("joinDate", "string");
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
                if (filteredResult.length > 0) {
                    var tableData = helper.HTMLHelper.generateTable(filteredResult);
                    document.getElementById("showData").innerHTML = tableData;
                }
                else
                    document.getElementById("Error").innerHTML = "No Record Found";
                var tableData = helper.HTMLHelper.generateTable(filteredResult);
                document.getElementById("showData").innerHTML = tableData;
                this.bindSelectRowEvents();
                this.bindDeletetRowEvents();
            }
            bindSelectRowEvents() {
                let btns = document.getElementsByClassName("selectBtn");
                for (let i = 0; i < btns.length; i++) {
                    btns[i].addEventListener("click", this.showEmployeeRow);
                }
            }
            bindDeletetRowEvents() {
                let delbtn = document.getElementsByClassName("deletebtn");
                for (let i = 0; i < delbtn.length; i++) {
                    delbtn[i].addEventListener("click", this.deleteRow);
                }
            }
            clearSearch() {
                document.getElementById('myInput').value = "";
                document.getElementById('mydept').value = "";
                document.getElementById('empStatus').value = "";
                document.getElementById('empSal').value = "";
                document.getElementById('joinDate').value = "";
                var tableData = helper.HTMLHelper.generateTable(this.results);
                document.getElementById("showData").innerHTML = tableData;
                this.bindSelectRowEvents();
                this.bindDeletetRowEvents();
            }
            cancel() {
                helper.AddHelper.showAddForm(false, "addForm");
                document.getElementById('myInputsecond').value = "";
                document.getElementById('mydeptsecond').value = "";
                document.getElementById('empStatussecond').value = "";
                document.getElementById('empSalsecond').value = "";
                document.getElementById('userjoinDate').value = "";
                var tableData = helper.HTMLHelper.generateTable(this.results);
                document.getElementById("showData").innerHTML = tableData;
                this.bindSelectRowEvents();
                this.bindDeletetRowEvents();
            }
        }
        Components.EmployeeInfo = EmployeeInfo;
    })(Components = EmployeeManagement.Components || (EmployeeManagement.Components = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Components;
    (function (Components) {
        var helper = EmployeeManagement.Helpers;
        class AddComponent {
            constructor(departmentArray, empStatusArray, empDetailsArray) {
                this.departmentArray = departmentArray;
                this.empStatusArray = empStatusArray;
                this.empDetailsArray = empDetailsArray;
                let empDetails;
                this.save = saveButton;
                let save = () => {
                    empDetails.fullName = helper.FilterFunctions.getElementById('myInputsecond', "string");
                    empDetails.departmentalId = helper.FilterFunctions.getElementById('mydeptsecond', "number");
                    empDetails.employeeStatusId = helper.FilterFunctions.getElementById('empStatussecond', "number");
                    empDetails.deparmentName = helper.ArrayHelperMethods.getById(departmentArray, empDetails.departmentalId);
                    empDetails.employeeStatusName = helper.ArrayHelperMethods.getById(empStatusArray, empDetails.employeeStatusId);
                    empDetails.empDetails = helper.FilterFunctions.getElementById('empSalsecond', "number");
                    empDetails.salary = helper.ArrayHelperMethods.getempBySalary(empDetailsArray, empDetails.empDetails);
                    empDetails.joiningDate = helper.FilterFunctions.getElementById('userjoinDate', "string");
                    this.addEvent(empDetails, true);
                    helper.AddHelper.showAddForm(false, "addForm");
                    helper.AddHelper.showAddForm(false, "btnUpdate");
                };
                document.getElementById("btnSave").addEventListener("click", save);
                function saveButton(result, event) {
                    this.addEvent = event;
                    empDetails = result;
                }
            }
        }
        Components.AddComponent = AddComponent;
        class EditComponent {
            constructor(empObj, clickevent, department, empStatus, empDetails, rowId, result) {
                this.empObj = empObj;
                this.rowId = rowId;
                this.result = result;
                this.updateEmployee(empObj, clickevent, department, empStatus, empDetails, rowId, result);
            }
            updateEmployee(empObj, clickevent, department, empStatus, empDetails, rowId, result) {
                this.matchedEmpObj = helper.AddHelper.getupdatedRow(result, rowId);
                this.matchedEmpObj.id = parseInt(this.rowId);
                this.matchedEmpObj.fullName = helper.FilterFunctions.getElementById('myInputsecond', "string");
                this.matchedEmpObj.departmentalId = helper.FilterFunctions.getElementById('mydeptsecond', "number");
                this.matchedEmpObj.employeeStatusId = helper.FilterFunctions.getElementById('empStatussecond', "number");
                this.matchedEmpObj.deparmentName = helper.ArrayHelperMethods.getById(department, this.matchedEmpObj.departmentalId);
                this.matchedEmpObj.employeeStatusName = helper.ArrayHelperMethods.getById(empStatus, this.matchedEmpObj.employeeStatusId);
                this.matchedEmpObj.empDetails = helper.FilterFunctions.getElementById('empSalsecond', "number");
                this.matchedEmpObj.salary = helper.ArrayHelperMethods.getempBySalary(empDetails, this.matchedEmpObj.empDetails);
                this.matchedEmpObj.joiningDate = helper.FilterFunctions.getElementById('userjoinDate', "string");
                clickevent(this.matchedEmpObj, false);
            }
        }
        Components.EditComponent = EditComponent;
    })(Components = EmployeeManagement.Components || (EmployeeManagement.Components = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    class App {
        constructor() {
            const employee = new EmployeeManagement.Components.EmployeeInfo();
        }
    }
    new App();
})(EmployeeManagement || (EmployeeManagement = {}));
var moment;
