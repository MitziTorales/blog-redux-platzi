import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//este componente al usar redux igual pueden recibir los reducers 
const Tabla = (props) => {

    const addFilas = () => props.usuarios.map((usuario, key) => (//puede llevar parentesis 
        <tr key={usuario.id}> 
            <td>
                { usuario.name }
            </td>
            <td>
                { usuario.email }
            </td>
            <td>
                { usuario.website }
            </td>
            <td>
                <Link to={ `/publicaciones/${key}`}>
                    <div className="eye-solid icon"></div>
                </Link>
            </td>
        </tr>
    ));

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>
                    Nombre
                    </th>
                    <th>
                    Correo
                    </th>
                    <th>       
                    Enlace
                    </th>
                    <td>

                    </td>
                </tr>
                </thead> 
                <tbody>
                { addFilas()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (reducers) =>{
  return reducers.usuariosReducer;
} 
//esta vez solo vamos a necesitar los datos no será necesario importar las acciones 
//ya que estas se realizan en el user.indexJS
export default connect(mapStateToProps)(Tabla);

//Para llenar la tabla hay dos formas de realizarlo una es enviando del componente
//padre los usuarios y la la otra es conectadolo con redux que es como se muestra en el código.
