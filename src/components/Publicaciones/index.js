import React, { Component } from 'react';
import { connect } from 'react-redux'
import Spinner from '../general/Spinner';
import Fatal from '../general/Error';
import Comentarios from './Comentarios'
import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { 
    traerPorUsuario: publicacionesTraerPorUsuarios, 
    abrirCerrar, 
    traerComentarios 
} = publicacionesActions; 

class Publicaciones extends Component {
    
    //en este caso se realizan dos llamadas asincronas pero como una se puede tardar mas que la otra
    //entonces se tiene que realizar primero una, siendo usuariosTraerTodos y posteriormente sus publicaciones
    //para ello lo ideal es hacer la función asincrona y esperar el resultado para que después sea ejecutado publicacionesTraerPorUsuarios
    async componentDidMount() {
        //hacer destrusturación para solo agregar el datos
        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuarios,
            match : { params: {key} }
        } = this.props ;

		if (!this.props.usuariosReducer.usuarios.length) {
			await usuariosTraerTodos();
        } 
        if(this.props.usuariosReducer.error){
            return ;
        }
        //corregir la sobreescritura de los datos si no las tiene las manda traer si no no hace nada.
        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){ //usuariosReducer no se puede restructurar porque cada que se renderiza puede ir cambiando por lo tal los datos van igual cambiando       
            publicacionesTraerPorUsuarios(key);
        }
    } 
    ponerUsuario = () => {
        const {
            usuariosReducer,
            match : { params : {key} }
        } = this.props

        if(usuariosReducer.error){
            return <Fatal mensaje={usuariosReducer.error} />
        }
        //se debe cumplir esta condición para poder mostrar el spinner pues puede que aun no se hayan cargado los usuarios 
        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando){
            return <Spinner/>
        }
        const nombre = usuariosReducer.usuarios[key].name;
        return (
            <h1>
                Publicaciones de {nombre}
            </h1>
        )
    }
    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer : { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: {params : { key } }
        } = this.props; 
        
        if (!usuarios.length) return;
		if (usuariosReducer.error) return;
		if (publicacionesReducer.cargando) {
			return <Spinner />;
		}
		if (publicacionesReducer.error) {
			return <Fatal mensaje={ publicacionesReducer.error } />
		}
		if (!publicaciones.length) return;
		if (!('publicaciones_key' in usuarios[key])) return;

        const { publicaciones_key } = usuarios[key];

        return this.showInfor(
            publicaciones[publicaciones_key],
            publicaciones_key
        );
    }

    showInfor = (publicaciones, pub_key) => (
		publicaciones.map((publicacion, com_key) => (
			<div
				key={publicacion.id}
				className='pub_titulo'
				onClick={
					() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)
				}
			>
				<h2>
					{ publicacion.title }
				</h2>
				<h3>
					{ publicacion.body }
				</h3>
				{
					(publicacion.abierto) ?
						<Comentarios
							comentarios={ publicacion.comentarios }
						/>
						: ''
				}
			</div>
		))
	);


    mostrarComentarios = (pub_key, com_key, comentarios) => {
		this.props.abrirCerrar(pub_key, com_key)
		if (!comentarios.length) {
			this.props.traerComentarios(pub_key, com_key)
		}
	};

    render() {
        console.log(this.props);
        
        return (
             <div>
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
             </div>
        );
    }
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer}) => {
	return {
        usuariosReducer,
        publicacionesReducer
    }
};

const mapDispatchToProps = {
     usuariosTraerTodos,
     publicacionesTraerPorUsuarios,
     abrirCerrar,
     traerComentarios
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);