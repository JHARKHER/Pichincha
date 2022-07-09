
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import { Provider } from "../../context/ContextReasignacionCampania";
import MasterReasignacionCampania from "../../containers/ConTReasignacionCampania";

const CampaniaReasignacion = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Reasignación Campaña"));
  }, []);
  return (
    <div className="app-wrapper">
      <Provider>
        <MasterReasignacionCampania
          {...props}
        />
      </Provider>
    </div>
  );
}

export default CampaniaReasignacion;