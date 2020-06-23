import * as roadmapActions from './roadmap.types'

const INITIAL_STATE = {
    error: null,
    loading: false,
    allRoadmaps: [],
    roadmapsByUser: [],
    mostPopularRoadmaps: [],
    highestRatedRoadmaps: [],

    // SEARCH BAR
    searchTerm: '',
    searchResult: [],
    // SEARCH BAR
}

const fetchAllRoadmaps = (state, action) => {
    return {
        ...state,
        allRoadmaps: action.payload
    }
}

const fetchRoadmapByUser = (state, action) => {
    return {
        ...state,
        roadmapsByUser: action.payload
    }
}

const fetchMostPopularRoadmaps = (state, action) => {
    return {
        ...state,
        mostPopularRoadmaps: action.payload
    }
}

const fetchMostPopularRoadmapsFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const fetchHighestRatedRoadmaps = (state, action) => {
    return {
        ...state,
        highestRatedRoadmaps: action.payload
    }
}

const fetchHighestRatedRoadmapsFail = (state, action) => {
    return {
        ...state,
        error: action.error
    }
}

const searchRoadmapsSuccess = (state, action) => {
    console.log('SEARCH ROADMAP REDUCER', action.searchResult)
    return {
        ...state,
        searchResult: action.searchResult,
        searchTerm: action.searchTerm,
    }
}

const searchRoadmapsFail = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

const roadmapReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case roadmapActions.FETCH_ALL_ROADMAP:
            return fetchAllRoadmaps(state, action)
        case roadmapActions.FETCH_ROADMAP_BY_USER:
            return fetchRoadmapByUser(state, action)
        case roadmapActions.FETCH_MOST_POPULAR_ROADMAPS:
            return fetchMostPopularRoadmaps(state, action)
        case roadmapActions.FETCH_MOST_POPULAR_ROADMAPS_FAIL:
            return fetchMostPopularRoadmapsFail(state, action)
        case roadmapActions.FETCH_HIGHEST_RATED_ROADMAPS:
            return fetchHighestRatedRoadmaps(state, action)
        case roadmapActions.FETCH_HIGHEST_RATED_ROADMAPS_FAIL:
            return fetchHighestRatedRoadmapsFail(state, action)
        case roadmapActions.SEARCH_ROADMAPS_SUCCESS:
            return searchRoadmapsSuccess(state, action)
        case roadmapActions.SEARCH_ROADMAPS_FAIL:
            return searchRoadmapsFail(state, action)
        default:
            return state
    }
}

export default roadmapReducer;