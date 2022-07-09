import React from "react";
import { CancelButton } from "odc-common";

const ComPCliente =(props)=> {
  const{setopenWindow}=props;

  const handleClose = () => {
    setopenWindow(false);
  }

    return (
      <div>
        
        <CancelButton  onClick={handleClose} />
        

      </div>
    );
  
}


export default ComPCliente;
