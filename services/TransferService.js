import {$apiRoutes} from "../http/routes";
import {$api} from "../http";

export default class TransferService {
    static async makeTransfer(data) {
        return await $api.post($apiRoutes.transfer, data);
    }
}