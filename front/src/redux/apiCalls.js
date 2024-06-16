import {loginFailure, loginStart, loginSuccess} from "./userRedux";
//import {toast} from 'react-toastify'
import axios from "axios";


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8800/api/auth/login", user);
        dispatch(loginSuccess(res.data));

    } catch (err) {
        dispatch(loginFailure());
                

    }
};

