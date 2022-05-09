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
        token: 'token',
        user: 'user',
    }
    isSidebarShow = false
    isAuth = false

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
            localStorage.setItem('token', data.accessToken);

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

        return response.status;
    }

    async login({email, password}) {
        try {
            const {data} = await UserService.login({email, password})
            console.log(data)
            localStorage.setItem(this.localStorage.token, data.accessToken);

            this.setAuth(true);
            this.setUser(data.user);

            return {status: 'success'}
        } catch ({response}) {
            return {status: 'error', errors: response.data.errors, message: response.data.message}
        }
    }

    async register({ name, email, bio, password, ref }) {
        try {
            const { data } = await UserService.register({ name, email, bio, password });

            if(ref) await UserService.makeRef({user_id: data.user.id, ref})

            localStorage.setItem(this.localStorage.token, data.accessToken);

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
}

export default new Store()