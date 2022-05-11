import {$apiRoutes} from "../http/routes";
import {$api} from "../http";

export default class UserService {
    static async getMe() {
        const response = await $api.get($apiRoutes.user);

        return response.data;
    }

    static async register(data) {
        return await $api.post($apiRoutes.register, data);
    }

    static async login(data) {
        return await $api.post($apiRoutes.login, data);
    }

    static async makeRef(data) {
        return await $api.post($apiRoutes.ref, data);
    }

    static async refreshToken() {
        return await $api.get($apiRoutes.refresh);
    }

    static async logout() {
        return await $api.post($apiRoutes.logout);
    }

    static async updateProfile(id, data) {
        return await $api.put($apiRoutes.users, {
            id, data
        });
    }

    static async startEarn(user_id) {
        return await $api.get($apiRoutes.farm.start(user_id))
    }

    static async endEarn(user_id) {
        return await $api.get($apiRoutes.farm.end(user_id))
    }

    static async changePassword(id, data) {
        return await $api.put($apiRoutes.changePassword, {
            id, data
        });
    }
}