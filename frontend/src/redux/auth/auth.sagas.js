import { takeLatest, call, put, all, takeEvery } from 'redux-saga/effects';
import api from '../../api'
import storage from 'redux-persist/lib/storage'; // local storage

import AuthActionTypes from './auth.types'
import { 
    signInSuccess,
    signInFail,

    signUpSuccess,
    signUpFail,

    logoutSuccess,
    logoutFail,

} from './auth.action'


export function* signInWithEmail({ payload: { username, password } }) {
    console.log(username)
    try {
        const res = yield api.post('rest-auth/login/', {
            username: username,
            password: password
        })
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000) // 1 hour
        localStorage.setItem('expirationDate', expirationDate)

        yield put(signInSuccess(token))
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* signUp({ payload: {username, email, password, confirm} }) {
    try {
        const res = yield api.post('rest-auth/registration/', {
            username: username,
            email: email,
            password: password,
            passwordConfirmed: confirm
        })

        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000) // 1 hour
        localStorage.setItem('expirationDate', expirationDate)

        yield put(signUpSuccess(token))
    } catch (error) {
        yield put(signUpFail(error));
    }
}

export function* logout() {
    try {
        yield localStorage.removeItem('expirationDate')
        // clear storage used by redux-persist
        yield storage.removeItem('persist:root')
        yield put(logoutSuccess());
    } catch (err) {
        yield put(logoutFail(err))
    }
}

// export const logout = () => {
//     return dispatch => {
//         localStorage.removeItem('expirationDate')
//         // clear storage used by redux-persist
//         storage.removeItem('persist:root')
//         dispatch(logoutSuccess);
//     }
// }

// function* fetchUser(action) {
//     try {
//         const user = yield call();
//         yield put({
//             type: AuthActionTypes.FETCH_USER_SUCCESS,
//             user: user
//         });
//     } catch (err) {
//         yield put({
//             type: AuthActionTypes.FETCH_USER_FAIL,
//             error: err.message
//         });
//     }
// }

// export function* watchFetchUser() {
//     yield takeEvery(
//         AuthActionTypes.FETCH_USER_REQUESTED, 
//         fetchUser
//     );
// }

export function* watchEmailSignInStart() {
    yield takeEvery(
        AuthActionTypes.SIGN_IN_START,
        signInWithEmail
    )
}

export function* watchSignUpStart() {
    yield takeLatest(
        AuthActionTypes.SIGN_UP_START,
        signUp
    )
}

export function* authSagas() {
    yield all([
        call(watchEmailSignInStart),
        call(watchSignUpStart)
    ]);
}