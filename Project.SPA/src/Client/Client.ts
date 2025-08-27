import type { OptionalID } from "../Types/OptionalID";

export interface Client<T extends { id: number }> {
    get(): Promise<T[]>;
    add(item: OptionalID<T>): Promise<T>;
    update(item: T): Promise<T>;
    delete(item: T): Promise<void>;
}
