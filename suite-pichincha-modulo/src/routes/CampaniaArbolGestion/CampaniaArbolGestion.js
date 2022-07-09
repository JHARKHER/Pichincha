
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import MasterCampaniaArbolGestion from "../../containers/ConTArbolGestion";

const CampaniaArbolGestion = ({ }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Árboles de Gestión"));
  }, []);
  return (
    <div className="app-wrapper">
      <MasterCampaniaArbolGestion />
    </div>
  );
}

export default CampaniaArbolGestion;