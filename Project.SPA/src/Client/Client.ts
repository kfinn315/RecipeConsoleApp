
export interface Client<T> {
    get(): Promise<T[]>;
    add(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(item: T): Promise<void>;
}
