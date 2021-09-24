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
                loading: false,
                payload: action.payload
            }
        case 'DATA_BYID':
            return {
                ...state,
                loading: false,
                payload: action.payload
            }
        default:
            return {
                ...state
            };
    };;
};  