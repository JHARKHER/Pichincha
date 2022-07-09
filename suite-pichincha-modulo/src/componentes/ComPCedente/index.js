// import React, { Fragment } from "react";
// import { reduxForm } from "redux-form";
// import { connect } from "react-redux";
// import { injectIntl } from "react-intl";
// ///CONTROLES DE LA MISMA LIBRERIA
// import {
//   ComboBox
// } from "odc-common";




// const formName = "CedenteForm";

// class Cedente extends React.Component {
 

//   render() {
//     //variables tomadas del props
//     const {
//       dataFindCedentes,
//     } = this.props;
   
    
//     return (
//       <form>
       
         
//             <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                
//               <ComboBox
//                 name="module"
//                 label={"Cedente"}
//                 elements={dataFindCedentes.map((item, index) => { return { code: item.codigoCedente, description: item.nombreCedente } })}
               
//               />
//             </div>
        
        
     
//       </form>
//     );
//   }
// }

// Cedente = reduxForm({
//   form: formName,
 
// })(Cedente);

// const mapStateToProps = ({ campania, form }) => {
    
//   const { CedenteForm } = form; //aqui ya se mete con reducers
//   const { dataFindCedentes } = campania.campaniaespecial;
   
//   return {
//     dataFindCedentes
//   };
// };

// Cedente = connect(
//   mapStateToProps,
//   { ObtenerCedenteExito
// }
// )(Cedente);

// export default injectIntl(Cedente);
