export interface Task {
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    tags: string[];
    completed: boolean;
    get uncompleted(): boolean;
  }