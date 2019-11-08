import axios from 'axios';
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

export const traerTodas = () => async (dispatch) => {
    //Se creo un nuevo estado entonces se necesita agregar
    dispatch ({
        type: CARGANDO
    });
    try{
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos'); 
        const tareas = {};//se crea el objeto
        respuesta.data.map((tar) => ( //arreglo de tarea se itera
            // al objeto se va a restructurar todo lo que tiene las tareas con el userId
            tareas[tar.userId] = { //al objeto  vacio de tareas el userId 
                ...tareas[tar.userId], //agrega lo que tiene las tareas al userId 
                //Se le agrega lo que tiene tarea
                [tar.id]: { // Se pasa un nuevo atributo que es ya de forma independiente si id 
                    ...tar
                }
            }
            //lo anterior lo que hizo fue que cada usuario tiene diferentes tareas por tanto en este punto trae todas 
            //las tareas de los usuarios. (usuarios y tareas)
        ));
        dispatch({//se comunica con el reducers
            type: TRAER_TODAS,
            payload: tareas
        })
    }catch (error){
        dispatch({
            type: ERROR,
            payload: 'Información de tareas no disponible.'
        })
    }
} 

//usuario_id es el value que se envia desde componente (Guardar)
export const cambioUsuarioId = (usuario_id) => (dispatch) => {
    dispatch({
        type: CAMBIO_USUARIO_ID,
        payload: usuario_id
    })
}

export const cambioTitle = (title) => (dispatch) => {
    dispatch({
        type: CAMBIO_TITLE,
        payload: title
    })
}

export const agregar = (nuevaTarea) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })    
    try {
        const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nuevaTarea)

        dispatch({
            type: GUARDAR
        })
    }
    catch(error){
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Intente mas tarde'
        })
    }
}

export const editar = (tarea_editada) => async (dispatch) =>{
    dispatch({
        type: CARGANDO
    })    
    try {
        const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada)
        dispatch({
            type: GUARDAR
        })
    }
    catch(error){
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Intente mas tarde'
        })
    }
}

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
    const { tareas } = getState().tareasReducer;
    const seleccionada = tareas[usu_id][tar_id]

    const actualizadas = {
        ...tareas
    };
    actualizadas[usu_id] = { 
        ...tareas[usu_id]
    };
    actualizadas[usu_id][tar_id] = {
        ...tareas[usu_id][tar_id],
        completed: !seleccionada.completed
    };
    dispatch({
        type: ACTUALIZAR,
        payload: actualizadas
    })
}

export const eliminar = (tar_id) => async (dispatch) =>{
    dispatch({
        type: CARGANDO
    });

    try {
        const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
        dispatch({
            type: TRAER_TODAS,
            payload: {}
        });
    }
    catch(error){
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Servicio no disponible'
        })
    }
}

export const limpiarForma = () => (dispatch) =>{
    dispatch({
        type: LIMPIAR
    })
}