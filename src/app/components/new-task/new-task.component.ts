import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task';
import { TaskServicesService } from 'src/app/services/task-services.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
  constructor(
    private taskService: TaskServicesService,
    private router: Router
  ) {}

  allTasks: Task[] = [];

  error: boolean = false;
  disableSubmit: boolean = true;

  createNewTaskForm = new FormGroup({
    taskTitle: new FormControl('', [Validators.required, this.lengthChecker()]),
    taskDescription: new FormControl('', [
      Validators.required,
      this.lengthChecker(),
    ]),
  });

  lengthChecker(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value.split(' ').length > 15) {
        return { customError: true };
      }

      return null;
    };
  }
  validate() {
    if (
      this.createNewTaskForm.controls.taskTitle.errors?.['customError'] ||
      this.createNewTaskForm.controls.taskDescription.errors?.['customError']
    ) {
      this.error = true;
    } else {
      this.error = false;
    }
    if (
      !this.createNewTaskForm.controls.taskDescription.errors &&
      !this.createNewTaskForm.controls.taskTitle.errors
    ) {
      this.disableSubmit = false;
    } else {
      this.disableSubmit = true;
    }
  }

  ngOnInit(): void {
    this.allTasks = this.taskService.getTasks();
  }

  onSubmit(): void {
    this.taskService.addTask({
      id: this.allTasks.length + 1,
      title: this.createNewTaskForm.value.taskTitle || '',
      description: this.createNewTaskForm.value.taskDescription || '',
      status: 'New Task',
    });
    this.router.navigate(['/']);
  }
}
