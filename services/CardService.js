import {$apiRoutes} from "../http/routes";
import {$api} from "../http";

export default class CardService {
    static async saveCard(user_id, data) {
        return await $api.post($apiRoutes.cards, {user_id, data});
    }
}