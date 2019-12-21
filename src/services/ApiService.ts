import HttpService, {setHttpServiceToken} from './HttpService';
import SessionService from "./SessionService";
import {API_KEY} from "../EnvConfig";

export default class ApiService {
    static async getAppToken() {
        const response = await HttpService.post('auth/session-request', {system_api_key: API_KEY});

        if (response.status !== 200) {
            return null;
        }

        return response.data.data.access_key;
    }

    static async loginUser(email: string, password: string) {
        setHttpServiceToken(SessionService.getItem("APP_TOKEN") as string);

        const data = {organization_user: {email: email, password: password}};
        const response = await HttpService.post('auth/session-register', data);

        if (response.status !== 200) {
            return null;
        }

        return response.data.data;
    }

    static async getPets(pagination: object, filters: object, sorting: Array<string>) {
        const data = {
            search: {
                _fields: [
                    "id",
                    "name",
                    "specie_id",
                    "sex_key",
                    "size_key",
                    "age_key",
                    "status_key",
                    "created_date"
                ],
                specie: {with: {_fields: ["id", "name"]}},
                ...filters
            },
            options: {
                // @ts-ignore
                page: pagination.current || 1,
                // @ts-ignore
                limit: pagination.pageSize || 10,
                sort: sorting || []
            }
        };

        const response = await HttpService.post('pet/search', data);

        if (response.status !== 200) {
            return null;
        }

        return response.data.data;
    }
}
