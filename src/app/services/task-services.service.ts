import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskServicesService {
  constructor() {}

  private tasks: Task[] = [
    {
      id: 1,
      title: 'New task',
      description: 'A new task',
      status: 'New Task',
    },
    {
      id: 2,
      title: 'In progress task',
      description: 'A task in progress',
      status: 'in progress',
    },
    {
      id: 3,
      title: 'Finished task',
      description: 'A finished task',
      status: 'done',
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTaskStatus(taskId: number, newStatus: string): void {
    const task = this.tasks.find((task) => task.id === taskId);

    if (task) {
      task.status = newStatus;
    }
  }
}
