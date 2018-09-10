import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../model/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[]

  constructor(private employeesService: EmployeeService) { }

  ngOnInit() {
    var list = this.employeesService.getAllEmployees()
    list.snapshotChanges().subscribe(item => {
      this.employeeList = []
      item.forEach(element => {
        console.log(element)
        var jsonPayload = element.payload.toJSON()
        jsonPayload['$key'] = element.key
        this.employeeList.push(jsonPayload as Employee)
      })
    })
  }

  onEdit(employee: Employee) {
    this.employeesService.selectedEmployee = Object.assign({}, employee)
  }

  onDelete(key: string) {
    if (confirm("Are you sure you want to delete?") == true)
      this.employeesService.deleteEmployee(key)
  }

}
