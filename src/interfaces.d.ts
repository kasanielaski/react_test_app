export interface IToDo {
    isDone: boolean;
    name: string;
}

export interface IToDoListProps {
    addTodo(payload?: string): void;
    loadStore(): void;
    saveStore(): void;
    todos: IToDo[];
}

export interface IToDoListState {
    input?: string;
}

export interface IListItemProps {
    changeTodoName(event: any): void;
    changeTodoStatus(event: any): void;
    data: IToDo;
    deleteTodo(event: any): void;
    saveStore(): void;
}

export interface IListItemState {
    isEdit: boolean;
    newName: string;
}
