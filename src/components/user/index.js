import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'
import Spinner from '../general/Spinner'
import Error from '../general/Error'
import Tabla from './Tabla'

class Usuarios extends Component {

  componentDidMount(){
    if(!this.props.usuarios.length){
      this.props.traerTodos();
    }
  }

  addContenido = ()=> {
    if(this.props.cargando){
      return <Spinner />
    }

    if(this.props.error){
      return <Error mensaje={this.props.error} />
    }
    return <Tabla /> //se puede enviar props de usuarios (opciona, se ocupa redux en tabla)
  }

  render (){       
    return (
      <div>
        <h1>Usuarios</h1>
        {this.addContenido()}
      </div>
    );
  }
} 
const mapStateToProps = (reducers) =>{
  return reducers.usuariosReducer;
}

export default  connect(mapStateToProps, usuariosActions)(Usuarios);
//connect debe recibir todos los reducer que el provedor le envia al usuario y el usuario decide cual usar