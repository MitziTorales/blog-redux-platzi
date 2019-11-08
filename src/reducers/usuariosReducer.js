import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes'
const INITAL_STATE = {
    usuarios: [],
    cargando: false,
    error: ''
};

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case TRAER_TODOS:
            return { 
                ...state, 
                usuarios: action.payload,
                cargando: false,
                error: ''
            };//retorna lo que trae el objeto y sobre escribe usuarios con el actionCreator (respuesta.data)
            // modifica el estado y el render vuelve a ejecutarse.

        case CARGANDO:
            return { ...state, cargando: true };

        case ERROR:
            return { ...state, error: action.payload, cargando: false };

        default: return state;
    }
    
} 