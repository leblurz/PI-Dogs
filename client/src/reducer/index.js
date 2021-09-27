
const initialState = {
    payload : [],
    loading: false,
    temperaments: [],
    payloadBackUp: []
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
                payload: action.payload,
                payloadBackUp: action.payload
            };
        case 'DATA_TEMPS':
            return {
                ...state,
                loading: false,
                temperaments: action.temperaments
            };
        case 'DATA_QUERY':
            return {
                ...state,
                loading: false,
                payload: action.payload
            };
        case 'AWAIT_BYID':
            return {
                ...state,
                loading: true,
                payload: action.payload
            };
        case 'DATA_BYID':
            return {
                ...state,
                loading: false,
                payload: action.payload
            };
        case "POST_DOG" :
            return {
                ...state,
            };
        case 'SORT_BY' :
            if (action.payload === 'AZ' || action.payload === 'ZA') {
                const filt = action.payload === 'AZ' ? state.payload.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) : state.payload.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                });
                return {
                    ...state,
                    payload: filt
                };
            };
            if (action.payload === 'UP' || action.payload === 'DOWN') {
                const filtWeight = action.payload === 'UP' ? state.payload.sort((a, b) => {
                    let minA = a.weight.split ('-');
                    let minB = b.weight.split ('-');
                    return minA[0] - minB[0];
                }) : state.payload.sort((a, b) => {
                    let minA = a.weight.split ('-');
                    let minB = b.weight.split ('-');
                    return minB[0] - minA[0];
                });
                return {
                    ...state,
                    payload: filtWeight
                };
            };
            if (action.payload === 'MYDB') {
                return {
                    ...state,
                    payload: state.payloadBackUp.filter(e => e.id.length === 36)
                }
            };
            if (action.payload === 'API') {
                return {
                    ...state,
                    payload: state.payloadBackUp.filter ( e=> e.id.length < 36)
                }
            }
            if (action.payload === 'default') {
                return {
                    ...state,
                    payload: state.payloadBackUp.sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (b.name > a.name) return -1;
                        return 0;
                    })
                };
            }
            else {
                const dogs = state.payload;
                const filtByTemp = dogs.filter(e => {
                    if (e.temperament !== undefined) {
                        return e.temperament.includes(action.payload)
                    }
                })
                return {
                    ...state,
                    payload: filtByTemp
                }
            };
        default:
            return {
                ...state
            };
    };
};  