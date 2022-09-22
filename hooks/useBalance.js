import {useEffect, useState} from "react";
import store from "../store/store";

export default function useBalance() {
    const user = store.user;
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        if(user.isActive !== undefined) {
            setBalance(user.balance)
        }
    }, [user])

    return balance
}