import {$apiRoutes} from "../http/routes";
import {$api} from "../http";

export default class TransferService {
    static async makeTransfer(data) {
        const response = await $api.post($apiRoutes.transfer, data);

        return response.data;
    }
}