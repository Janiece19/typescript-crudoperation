///<reference path="HelperReference.ts"/>
module EmployeeManagement.Helpers {

    export class HTMLHelper {
        static generateTable(array) {

            if (array && array.length === 0) { return ""; }

            let htmlContent = "<table border='1' style='width:100%'>";
            let tableHeaders = Object.keys(array[0]);
            tableHeaders.push("action");
            //tableHeaders.push("Delete");

            /* Table header */
            let headerContent = "<tr>";
            tableHeaders.forEach((header) => {
                headerContent += "<th>" + header + "</th>";
            });
            headerContent += "</tr>";

            /* Table Body */
            let tableBody = "";
            array.forEach((item) => {
                tableBody += "<tr class='empRowSelect'>";
                let i = 0;
                tableHeaders.forEach((th) => {
                    if(i<9){
                    tableBody += "<th>" + item[th] + "</th>";
                    ++i;
                    }
                    else
                    tableBody +="<th><input type='button' class='selectBtn' value='Select' /><input type='button' class='deletebtn' value='Delete'/></th>";
                });
                    tableBody += "</tr>";
            });

            /* generate complete table and return */
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
}
