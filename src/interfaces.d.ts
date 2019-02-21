export interface IToDo {
    isDone: boolean;
    name: string;
}

export interface IToDoListProps {
    addTodo(payload: string): void;
    loadStore(): void;
    saveStore(): void;
    todos: IToDo[];
}

export interface IToDoListState {
    input: string;
}

export interface IListItemProps {
    changeTodoName(payload: { currentName: string; newName: string }): void;
    changeTodoStatus(payload: string): void;
    data: IToDo;
    deleteTodo(payload: string): void;
    saveStore(): void;
}

export interface IListItemState {
    isEdit: boolean;
    newName: string;
}
