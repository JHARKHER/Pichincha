// import React from "react";
// import MasterCampaniaEspeciales from "../../containers/ConTCampaniaEspecial";
// import MasterCampaniaNuevo from "../../containers/ConTCampaniaNuevo";
// import { ContainerHeader } from "odc-common";
// import { connect } from "react-redux";


// class CampaniaEspecial extends React.Component {

//   render() {
//     const { openWindow } = this.props; // variables del reducer. Se dispara la accion y se modifica en el reducer
//     return (
//       <div className="app-wrapper ">
//  <ContainerHeader match={this.props.match} title={"Administración Cargas"} />
// {!openWindow &&
//         <div>
//           <MasterCampaniaEspeciales  />
//         </div>
//   }
//   {openWindow &&
//         <div>
//           <MasterCampaniaNuevo  />
//         </div>
//   }
//       </div>
      
//     );
//   }
// }

// const mapStateToProps = ({ campania }) => { ///estas variables estan en el estado lo que se hace son sacarlar
//   const {openWindow} = campania.campaniaespecial;//del estado.catalog se obtiene de la memoria

//   return {
//     openWindow
//   };
// };

// CampaniaEspecial = connect( //conectate al mapstatetoprops y adicional incluyeme las otras funciones
//   mapStateToProps,
//   {
//     showWindow
//   }
// )(CampaniaEspecial);


// export default CampaniaEspecial;
