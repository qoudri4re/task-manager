import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskServicesService } from 'src/app/services/task-services.service';
import { Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
// import { CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private taskService: TaskServicesService,
    private router: Router
  ) {}

  allTasks: Task[] = [];
  newTasks: Task[] = [];
  inprogressTasks: Task[] = [];
  doneTasks: Task[] = [];

  columns = {};

  updateTasks() {
    this.newTasks = [];
    this.inprogressTasks = [];
    this.doneTasks = [];

    this.allTasks.map((task) => {
      if (task.status === 'New Task') {
        this.newTasks.push(task);
      } else if (task.status === 'in progress') {
        this.inprogressTasks.push(task);
      } else {
        this.doneTasks.push(task);
      }
    });
  }

  toNewTaskPage() {
    this.router.navigate(['/new-task']);
  }

  dropOnColumnOne(event: CdkDragDrop<any>) {
    let dataTransfered = event.previousContainer.data[event.previousIndex];

    if (
      dataTransfered.status === 'done' ||
      dataTransfered.status === 'in progress'
    ) {
      this.taskService.updateTaskStatus(dataTransfered.id, 'New Task');
    } else {
      //same column
    }
    this.allTasks = this.taskService.getTasks();
    this.updateTasks();
  }

  dropOnColumnTwo(event: CdkDragDrop<any>) {
    let dataTransfered = event.previousContainer.data[event.previousIndex];

    if (
      dataTransfered.status === 'New Task' ||
      dataTransfered.status === 'done'
    ) {
      this.taskService.updateTaskStatus(dataTransfered.id, 'in progress');
    } else {
      //same column
    }
    this.allTasks = this.taskService.getTasks();
    this.updateTasks();
  }

  dropOnColumnThree(event: CdkDragDrop<any>) {
    let dataTransfered = event.previousContainer.data[event.previousIndex];

    if (
      dataTransfered.status === 'New Task' ||
      dataTransfered.status === 'in progress'
    ) {
      this.taskService.updateTaskStatus(dataTransfered.id, 'done');
    } else {
    }
    this.allTasks = this.taskService.getTasks();
    this.updateTasks();
  }

  ngOnInit(): void {
    this.allTasks = this.taskService.getTasks();
    this.updateTasks();
    console.log(this.allTasks);
  }
}
