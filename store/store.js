import {makeAutoObservable, toJS} from "mobx";
import UserService from "../services/UserService";
import TransferService from "../services/TransferService";

class Store {
    defaultUser = {
        name: '',
        email: '',
        bio: '',
        number: '',
    }
    user = {...this.defaultUser}
    localStorage = {
        user: 'user',
    }

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    async getUser() {
        const userFromLocalStorage = localStorage.getItem(this.localStorage.user);

        this.setUser(JSON.parse(userFromLocalStorage))

        if(!userFromLocalStorage) {
            const response = await UserService.getMe();

            localStorage.setItem(this.localStorage.user, JSON.stringify(response));
            this.setUser(response)
        }

        return toJS(this.user)
    }

    async makeTransfer({ number, amount }) {
        const response = await TransferService.makeTransfer({
            from: this.user.number,
            to: number,
            amount: amount,
        })

        return response.status;
    }
}

export default new Store()