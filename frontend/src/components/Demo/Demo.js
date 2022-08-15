import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const Demo = () => {
    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();
        const credential = "demo@user.io";
        const password = "password";
        return dispatch(
            sessionActions.login({ credential, password })
        ).catch(async (res) => {
            await res.json();
        });
    };
    return (
        <button className='button' onClick={demoLogin}>
            Demo User
        </button>
    );
};

export default Demo;
