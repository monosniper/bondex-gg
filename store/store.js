import {makeAutoObservable, toJS} from "mobx";
import UserService from "../services/UserService";
import CardService from "../services/CardService";
import TransferService from "../services/TransferService";
import { setCookies } from 'cookies-next';

class Store {
    defaultUser = {
        name: '',
        email: '',
        bio: '',
        number: '',
    }
    user = {...this.defaultUser}
    localStorage = {
        token: 'token',
        user: 'user',
    }
    isSidebarShow = false
    isAuth = false
    depositModalOpen = false

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setSidebar(bool) {
        this.isSidebarShow = bool
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    fixAuth(token) {
        localStorage.setItem(this.localStorage.token, token);
        setCookies(this.localStorage.token, token);
    }

    setDepositModal(bool) {
        this.depositModalOpen = bool;
    }

    async logout() {
        try {
            await UserService.logout();
            localStorage.removeItem('token');

            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const {data} = await UserService.refreshToken();

            this.fixAuth(data.accessToken)

            this.setAuth(true);
            this.setUser(data.user);
        } catch (e) {
            this.setAuth(false);
        } finally {
            this.setLoading(false);
        }
    }

    async makeTransfer({ number, amount }) {
        const response = await TransferService.makeTransfer({
            from: this.user.number,
            to: number,
            amount: amount,
        })

        return response;
    }

    async login({email, password}) {
        try {
            const {data} = await UserService.login({email, password})

            this.fixAuth(data.accessToken)

            this.setAuth(true);
            this.setUser(data.user);

            return {status: 'success'}
        } catch ({response}) {
            return {status: 'error', errors: response.data.errors, message: response.data.message}
        }
    }

    async register({ name, email, password, ref }) {
        try {
            const { data } = await UserService.register({ name, email, password });

            if(ref) await UserService.makeRef({user_id: data.user.id, ref})

            this.fixAuth(data.accessToken)

            this.setUser(data.user)
            this.setAuth(true)

            return {status: 'success'}
        } catch ({response}) {
            return {status: 'error', errors: response.data.errors, message: response.data.message}
        }
    }

    async changePassword(data) {
        try {
            const {user} = await UserService.changePassword(this.user.id, data);

            this.setUser(user)

            return {status: 'success'}
        } catch ({response}) {
            return {status: 'error', message: response.data.message}
        }
    }

    async updateProfile({ name, email, bio }) {
        try {
            let data = {}
            if(email === this.user.email) data = {name, bio}
            else data = {name, email, bio}

            const response = await UserService.updateProfile(this.user.id, data);

            this.setUser(response.data)

            return {status: 'success'}
        } catch ({response}) {
            return {status: 'error', errors: response.data.errors, message: response.data.message}
        }
    }

    async startEarn() {
        try {
            const response = await UserService.startEarn(this.user.id);

            console.log(response)

            this.setUser({
                ...this.user,
                activeUntil: response.data,
                isActive: true,
            })
            console.log(toJS(this.user))
            return response
        } catch (e) {

        }
    }

    async endEarn() {
        try {
            return await UserService.endEarn(this.user.id);
        } catch (e) {

        }
    }

    async saveCard(data) {
        return await CardService.saveCard(this.user.id, data);
    }
}

export default new Store()