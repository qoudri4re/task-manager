import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskServicesService {
  constructor() {}

  private tasks: Task[] = [];

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
