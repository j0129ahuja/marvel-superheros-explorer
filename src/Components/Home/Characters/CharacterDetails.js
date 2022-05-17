import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { connect } from "react-redux";

import { setState, getState } from "../../../utils";

function CharacterDetails(props) {
  // CONSTANTS
  const { selectedCharacter } = props;

  // STATES
  const [saved, setSaved] = useState(false);

  // FUNCTIONS
  const handleSave = (character) => {
    let savedList = getState("saved");

    if (savedList?.length > 0) {
      if (
        savedList?.filter((element) => element.id === character.id)?.length > 0
      ) {
        setState("saved", [
          ...savedList?.filter((element) => element.id !== character.id),
        ]);
        setSaved(false);
      } else {
        setState("saved", [...savedList, character]);
        setSaved(true);
      }
    } else {
      setState("saved", [character]);
      setSaved(true);
    }
  };

  useEffect(() => {
    let savedList = getState("saved");
    if (
      savedList?.filter((element) => element.id === selectedCharacter.id)
        ?.length > 0
    ) {
      setSaved(true);
    }
  }, []);

  return (
    <div className="px-3 px-md-4 pb-4">
      <Image
        src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
        title={selectedCharacter.name}
        className="img-fluid mb-3 mb-md-4"
        style={{ height: "300px", width: "auto" }}
      />
      <div className="d-flex align-items-center justify-content-between mb-3">
        <p className="fw-bold text-uppercase mb-0">Description</p>
        <Button
          size="sm"
          variant="light"
          className="border"
          onClick={(e) => {
            handleSave(selectedCharacter);
            e.stopPropagation();
          }}
        >
          {saved ? <span>✅ Saved</span> : <span>Save</span>}
        </Button>
      </div>

      <p>
        {selectedCharacter.description ? (
          selectedCharacter.description
        ) : (
          <i className="small">Description not available</i>
        )}
      </p>

      <div id="urls">
        <p className="fw-bold small mb-0">
          URLS ({selectedCharacter?.urls?.length})
        </p>
        {selectedCharacter?.urls?.length > 0 ? (
          <ol>
            {selectedCharacter?.urls?.map((url, idx) => (
              <li key={idx}>
                <span className="me-2">[{url.type}]</span>
                <a href={url.url} target="_blank" key={idx}>
                  {url.url}
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mb-0 small">
            <i>URLS not available</i>
          </p>
        )}
      </div>

      <div id="comics">
        <p className="fw-bold small mb-0">
          Comics ({selectedCharacter?.comics?.available ?? 0}){" "}
          {selectedCharacter?.comics?.collectionURI && (
            <a href={selectedCharacter?.comics?.collectionURI} target="_blank">
              [Collection]
            </a>
          )}
        </p>
        {selectedCharacter?.comics?.items?.length > 0 ? (
          <ol>
            {selectedCharacter?.comics?.items?.map((url, idx) => (
              <li key={idx}>
                <a href={url.resourceURI} target="_blank" key={idx}>
                  {url.name}
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mb-0 small">
            <i>Comics not available</i>
          </p>
        )}
      </div>

      <div id="series">
        <p className="fw-bold small mb-0">
          Series ({selectedCharacter?.series?.available ?? 0}){" "}
          {selectedCharacter?.series?.collectionURI && (
            <a href={selectedCharacter?.series?.collectionURI} target="_blank">
              [Collection]
            </a>
          )}
        </p>
        {selectedCharacter?.series?.items?.length > 0 ? (
          <ol>
            {selectedCharacter?.series?.items?.map((url, idx) => (
              <li key={idx}>
                <a href={url.resourceURI} target="_blank" key={idx}>
                  {url.name}
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mb-0 small">
            <i>Series not available</i>
          </p>
        )}
      </div>

      <div id="stories">
        <p className="fw-bold small mb-0">
          Stories ({selectedCharacter?.stories?.available ?? 0}){" "}
          {selectedCharacter?.stories?.collectionURI && (
            <a href={selectedCharacter?.stories?.collectionURI} target="_blank">
              [Collection]
            </a>
          )}
        </p>
        {selectedCharacter?.stories?.items?.length > 0 ? (
          <ol>
            {selectedCharacter?.stories?.items?.map((url, idx) => (
              <li key={idx}>
                <a href={url.resourceURI} target="_blank" key={idx}>
                  {url.name}
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mb-0 small">
            <i>Stories not available</i>
          </p>
        )}
      </div>

      <div id="events">
        <p className="fw-bold small mb-0">
          Events ({selectedCharacter?.events?.available ?? 0}){" "}
          {selectedCharacter?.events?.collectionURI && (
            <a href={selectedCharacter?.events?.collectionURI} target="_blank">
              [Collection]
            </a>
          )}
        </p>
        {selectedCharacter?.events?.items?.length > 0 ? (
          <ol>
            {selectedCharacter?.events?.items?.map((url, idx) => (
              <li key={idx}>
                <a href={url.resourceURI} target="_blank" key={idx}>
                  {url.name}
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mb-0 small">
            <i>Events not available</i>
          </p>
        )}
      </div>

      <p>
        <small className="text-muted">
          Modified: {selectedCharacter.modified}
        </small>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  //   selectedCharacter: state.selectedCharacter,
});

export default connect(mapStateToProps)(CharacterDetails);
