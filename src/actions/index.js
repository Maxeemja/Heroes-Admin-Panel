export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const filtersFetch = (request) => (dispatch) => {
    dispatch(filtersFetching())
    request(`http://localhost:3001/filters`)
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError));
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}
export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}
export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        id: id
    }
}
export const heroAdded = (data) => {
    return {
        type: 'HERO_ADDED',
        payload: data
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const setFilter = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter 
    }
}