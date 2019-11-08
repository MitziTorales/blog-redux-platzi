import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes'

export const traerTodos = () => async (dispatch) => {
    //Se creo un nuevo estado entonces se necesita agregar
    dispatch ({
        type: CARGANDO
    });
    try{
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users'); 
        dispatch({//se comunica con el reducers
            type: TRAER_TODOS,
            payload: respuesta.data
        })
    }catch (error){
        dispatch({
            type: ERROR,
            payload: 'Información de usuarios no disponible.'
        })
    }
} 