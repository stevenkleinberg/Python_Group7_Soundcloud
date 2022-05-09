import React, { useState } from "react";

import "./AddEditPlaylist.css";
import EditPlaylistForm from "../EditPlaylist";
import AllTracksModal from "./AllTracksModal";
import NewPlaylistForm from "../CreatePlaylist";

const AddEditPlaylistModal = ({ modalMode, modalFunction, songArr }) => {
  const [mode, setMode] = useState("basic");
  return (
    <div className="AEP_modal">
      <div className="flex-column AEP_modal_inner_container">
        <div className="flex-row AEP_inner_container_titles">
          <p
            onClick={() => setMode("basic")}
            className={
              mode == "basic" ? "AEP_basic_title selected" : "AEP_basic_title"
            }
          >
            Basic Info
          </p>

          {modalMode === "edit" && (
            <p
              onClick={() => setMode("tracks")}
              className={
                mode == "tracks"
                  ? "AEP_basic_title selected"
                  : "AEP_basic_title"
              }
            >
              Tracks
            </p>
          )}
        </div>
        {modalMode === "edit" ? (
          <>
            {mode === "basic" && (
              <EditPlaylistForm modalFunction={modalFunction} />
            )}
            {mode === "tracks" && <AllTracksModal songArr={songArr} />}
          </>
        ) : (
          <NewPlaylistForm modalFunction={modalFunction} />
        )}
      </div>
    </div>
  );
};

export default AddEditPlaylistModal;
