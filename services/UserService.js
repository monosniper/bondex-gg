import {$apiRoutes} from "../http/routes";
import {$api} from "../http";

export default class UserService {
    static async getMe() {
        const response = await $api.get($apiRoutes.user);

        return response.data;
    }
}