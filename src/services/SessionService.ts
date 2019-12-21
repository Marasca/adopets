export default class SessionService {
    static getItem(key: string) {
        return sessionStorage.getItem(key);
    }

    static setItem(key: string, value: any) {
        sessionStorage.setItem(key, value);
    }

    static removeItem(key: string) {
        sessionStorage.removeItem(key);
    }
}
