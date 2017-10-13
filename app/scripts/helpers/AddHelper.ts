/// <reference path="HelperReference.ts" />

module EmployeeManagement.Helpers{
    import models=EmployeeManagement.Models;
    export class AddHelper{
        static showAddForm(visibilityFlag,txtid){
            let addForm = document.getElementById(txtid);
            if(visibilityFlag){
                addForm.style.visibility = "visible";
            }else{
              addForm.style.visibility = "hidden";
            }
            
          }

          static getByRowId(array, id:number) {
            let selectedItem = array.find((item) => {
                return item.id === id;
            });
            if(selectedItem)
            {
               return selectedItem; 
            }
            else
            return null;
    
        }

        static getupdatedRow(mainArray,id) {
            let selectedItem = mainArray.find((item) => {
                return(item.id === parseInt(id))
                
            });
            if(selectedItem)
            {
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
}