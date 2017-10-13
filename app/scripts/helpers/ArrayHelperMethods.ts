///<reference path="HelperReference.ts"/>
module EmployeeManagement.Helpers {
    export class ArrayHelperMethods {
        static getById(array, id): string {
            let selectedItem = array.find((item) => {
                return item.id === id;
            });
            if (selectedItem) {
                return selectedItem.name;
            } else {
                return "NA"
            }
        }


        static getEmpDetailsById(array, id): number | string {
            let selectedEmployee = array.find((empdtl) => {
                //console.log(empDtl.employeeId);
                return empdtl.employeeId === id;
            });
            //console.log(selectedEmployee);
            if (selectedEmployee)
                return selectedEmployee.employeeId;
            else
                return "NA";
        }



        static getJoiningDateById(array, id): string {
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


        static getempBySalary(salary, id): number {
            let empsal = salary.find((item) => {
                return item.employeeId == id;
            });
            if (empsal) {
                return empsal.salary;
            }
            return null;
        }
    }




    export class FilterFunctions {
        static getElementById<T>(elementId: string, returnType: string): T {

            let selectedElement: any = document.getElementById(elementId);
            //if(isNaN(selectedElement.value))
            

            if (selectedElement) {

                if (returnType === "number") {
                    let convertToInteger: any = parseInt(selectedElement.value);
                    return convertToInteger;
                } else {
                    return selectedElement.value;
                }
            }
        }

           static validateName(array, name)
           {
               array.filter((item)=>{
                         if(item.fullName.includes (name))
                         alert(name +"already exists");

               })
           }
        // static getFilterId(array, propertyName, propertyValue) {
        //     return array.filter(function (arr) { return (arr[propertyName] === propertyValue); });
        // }
        static getFilterId(array, propertyName, propertyValue) {
            return array.filter((array) => {
                if (isNaN(propertyValue)) {
                    var lowerPropertyValue = propertyValue.toLowerCase();
                    var arr = (array[propertyName]).toLowerCase();
                    return arr.includes(lowerPropertyValue);
                } else if (!isNaN(propertyValue)) {
                    return array[propertyName] == propertyValue;
                    //  return array[propertyName].includes(propertyValue);
                }
                else {
                    return array[propertyName] === propertyValue;
                }
            });
        }




    }


}
