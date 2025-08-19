
export class BaseClient {
    constructor() { }

    get<T>(url: string): Promise<T> {
        return fetch(url, { method: "GET", headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).catch((reason) => {
                throw reason;
            });
    }

    add<T>(url: string, item: T): Promise<T> {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).catch((reason) => {
            throw reason;
        });
    }

    update<T>(url: string, item: T): Promise<T> {
        return fetch(url, {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).catch((reason) => {
            throw reason;
        });
    }
}
