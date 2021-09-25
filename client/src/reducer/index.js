const initialState = {
    payload : [],
    loading: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'AWAIT_DOGS':
            return {
                ...state,
                loading: true
            };
        case 'DATA_DOGS':
            return {
                ...state,
                loading: false,
                payload: action.payload
            };

        case 'AWAIT_TEMPS':
            return {
                ...state,
                loading: true
            };
        case 'DATA_TEMPS':
            return {
                ...state,
                loading: false,
                payload: action.payload
            };
        case 'AWAIT_QUERY':
            return {
                ...state,
                loading: false,
                payload: action.payload
            }
        case 'DATA_QUERY':
            return {
                ...state,
                loading: false,
                payload: action.payload
            }
        case 'AWAIT_BYID':
            return {
                ...state,
                loading: true,
                payload: action.payload
            }
        case 'DATA_BYID':
            return {
                ...state,
                loading: false,
                payload: action.payload
            }
        case 'SORT_NAME' :
            return ({})
        case 'SORT_WEIGHT':
            return ({})
        case "POST_DOG" :
            return {
                ...state
            }
        default:
            return {
                ...state
            };
    };;
};  