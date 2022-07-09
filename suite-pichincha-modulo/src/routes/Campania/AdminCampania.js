
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import MasterCampania from '../../containers/ConTCampania'




const AdminCampania = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Administración Campaña"));
  }, []);
  return (
    <div className="app-wrapper">
      <MasterCampania
        {...props}
      />
    </div>

  )
}


export default AdminCampania;