import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeesService: EmployeeService) { }

  ngOnInit() {
    this.resetForm()
  }

  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
      this.employeesService.insertEmployee(employeeForm.value)
    else
      this.employeesService.updateEmployee(employeeForm.value)
    this.resetForm(employeeForm)
  }

  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset()
    this.employeesService.selectedEmployee = {
      $key: null,
      name: '',
      position: '',
      office: '',
      salary: 0
    }
  }
}
