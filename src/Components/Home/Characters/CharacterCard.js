import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { connect } from "react-redux";

import { setSelectedCharacter } from "../../../store/actions";
import { getState, setState } from "../../../utils";

function CharacterCard(props) {
  // CONSTANTS
  const { character, setSelectedCharacter, handleShow } = props;

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
      savedList?.filter((element) => element.id === character.id)?.length > 0
    ) {
      setSaved(true);
    }
  }, []);

  return (
    <Card className="mx-2" onClick={handleShow} style={{ cursor: "pointer" }}>
      <Card.Img
        variant="top"
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <span>{character.name}</span>
          <Button
            size="sm"
            variant="light"
            className="border"
            onClick={(e) => {
              handleSave(character);
              e.stopPropagation();
            }}
          >
            {saved ? <span>✅ Saved</span> : <span>Save</span>}
          </Button>
        </Card.Title>
        <Card.Text>
          {character.description ? (
            character.description?.length > 80 ? (
              <span>
                {character.description?.substr(0, 80) + "..."}
                <a className="ms-1 mb-0">Read more</a>
              </span>
            ) : (
              <span>{character.description}</span>
            )
          ) : (
            <i className="small">Description not available</i>
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Modified: {character.modified}</small>
      </Card.Footer>
    </Card>
  );
}

export default connect((state) => ({}), { setSelectedCharacter })(
  CharacterCard
);
