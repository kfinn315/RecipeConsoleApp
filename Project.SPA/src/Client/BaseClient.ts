import type { OptionalID } from "../Types/OptionalID";

export class BaseClient {
    constructor() { }

    get<T>(url: string): Promise<T> {
        console.info('BaseClient get', url);
        return fetch(url, { method: "GET", headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                console.info('fetch response', response)
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).catch((reason) => {
                console.error('from fetch', reason)
                throw reason;
            });
    }

    add<T extends { id: number }>(url: string, item: OptionalID<T>): Promise<T> {
        console.info('BaseClient add', url, item);
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.info('fetch response', response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).catch((reason) => {
            console.error('from fetch', reason)
            throw reason;
        });
    }

    update<T>(url: string, item: T): Promise<T> {
        console.info('BaseClient update', url, item);
        return fetch(url, {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.info('fetch response', response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).catch((reason) => {
            console.error('from fetch', reason)
            throw reason;
        });
    }
}
