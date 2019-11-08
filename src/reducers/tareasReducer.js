import { 
    TRAER_TODAS, 
    CARGANDO, 
    ERROR,
    CAMBIO_USUARIO_ID,
    CAMBIO_TITLE,
    GUARDAR,
    ACTUALIZAR,
    LIMPIAR
} from '../types/tareasTypes'

const INITAL_STATE = {
    tareas: {},
    cargando: false,
    error: '',
    usuario_id: '',
    title: '',
    regresar: false
};

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case TRAER_TODAS:
            return { 
                ...state, 
                tareas: action.payload,
                cargando: false,
                error: '',
                regresar: false
            };
        case CARGANDO:
            return { ...state, cargando: true };

        case ERROR:
            return { ...state, error: action.payload, cargando: false };

        case CAMBIO_USUARIO_ID:
            return { ...state, usuario_id: action.payload  }

        case CAMBIO_TITLE:
            return { ...state, title:action.payload }

        case GUARDAR:
            return {
                ...state, 
                tareas:{}, 
                cargando:false, 
                error:'', 
                regresar: true,
                usuario_id:'',
                title:''
            }

        case ACTUALIZAR:
            return {
                ...state,
                tareas: action.payload
            }

        case LIMPIAR:
            return{
                ...state,
                usuario_id: '',
                title: ''
            }

        default: return state;
    }
    
} 