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

  drop(event: CdkDragDrop<any>) {
    // console.log(event);
    // console.log(event.previousIndex);
    // console.log(event.currentIndex);

    console.log(event.previousContainer.id);
    console.log(event.container.id);

    if (event.previousContainer.id === event.container.id) {
    } else {
      let previousContainerId = event.previousContainer.id;
      let indexOfDataMoved = event.previousIndex;
      if (event.container.id === 'cdk-drop-list-0') {
        if (previousContainerId === 'cdk-drop-list-2') {
          let data = this.inprogressTasks.splice(indexOfDataMoved, 1)[0];
          this.newTasks.push({
            ...data,
            status: 'New Task',
          });
          this.taskService.updateTaskStatus(data.id, 'New Task');
        } else {
          let data = this.doneTasks.splice(indexOfDataMoved, 1)[0];
          this.newTasks.push({
            ...data,
            status: 'New Task',
          });
        }
      } else if (event.container.id === 'cdk-drop-list-2') {
        if (previousContainerId === 'cdk-drop-list-0') {
          let data = this.newTasks.splice(indexOfDataMoved, 1)[0];
          this.inprogressTasks.push({
            ...data,
            status: 'in progress',
          });
          this.taskService.updateTaskStatus(data.id, 'in progress');
        } else {
          let data = this.doneTasks.splice(indexOfDataMoved, 1)[0];
          this.inprogressTasks.push({
            ...data,
            status: 'in progress',
          });
        }
      } else {
        if (previousContainerId === 'cdk-drop-list-0') {
          let data = this.newTasks.splice(indexOfDataMoved, 1)[0];
          this.doneTasks.push({
            ...data,
            status: 'done',
          });
          this.taskService.updateTaskStatus(data.id, 'done');
        } else {
          let data = this.inprogressTasks.splice(indexOfDataMoved, 1)[0];
          this.doneTasks.push({
            ...data,
            status: 'done',
          });
        }
      }
    }
  }

  ngOnInit(): void {
    this.allTasks = this.taskService.getTasks();
    this.updateTasks();
    console.log(this.allTasks);
  }
}
