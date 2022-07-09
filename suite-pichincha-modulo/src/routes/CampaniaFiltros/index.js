
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import MasterFiltrosCampania from "../../containers/ConTFiltrosCampania";
import { Provider } from "../../context/ContextReparticionCampania";

const CampaniaFiltros = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Repartición Campaña"));
  }, []);
  return (
    <div className="app-wrapper">
      <Provider>
        <MasterFiltrosCampania
          {...props}
        />
      </Provider>
    </div>
  );
}

export default CampaniaFiltros;