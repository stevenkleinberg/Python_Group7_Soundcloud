import React, { useState } from "react";
import BasicModeForm from "./BasicModeForm";

import "./AddEditPlaylist.css";

const AddEditPlaylistModal = ({ modalMode }) => {
  const [mode, setMode] = useState("basic");
  return (
    <div className="AEP_modal">
      <div className="flex-column AEP_modal_inner_container">
        <div className="flex-row ">
          <p>Basic Info</p>
          <p>Tracks</p>
        </div>
        {mode === "basic" && <BasicModeForm />}
      </div>
    </div>
  );
};

export default AddEditPlaylistModal;
