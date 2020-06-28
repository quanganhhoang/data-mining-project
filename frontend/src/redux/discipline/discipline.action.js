import {
    FETCH_ALL_DISCIPLINE_SUCCESS,
    FETCH_ALL_DISCIPLINE_FAIL
} from './discipline.type';

import api from '../../api';

export const fetchAllDisciplines = () => {
    return (dispatch, getState) => {
        const { token } = getState().auth;
        api.get('api/roadmaps/disciplines/', {
            headers: {
                Authorization: token ? `Token ${token}` : ''
            }
        })
        .then(res => {
            dispatch(fetchAllDisciplineSuccess(res.data))
        })
        .catch(err => {
            dispatch(fetchAllDisciplineFail(err))
        })
    }
}

export const fetchAllDisciplineSuccess = (data) => {
    return {
        type: FETCH_ALL_DISCIPLINE_SUCCESS,
        payload: data
    }
}

export const fetchAllDisciplineFail = (err) => {
    return {
        type: FETCH_ALL_DISCIPLINE_FAIL,
        payload: err
    }
}