/// <reference path="ServiceReference.ts" />

module EmployeeManagement.Services {
    export class MainService {
        constructor() {

        }

        protected getByUrl<T>(url: string): Promise<T> {
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
}