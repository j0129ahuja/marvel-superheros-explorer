import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import { setSelectedCharacter } from "../../../store/actions";

function CharacterCard(props) {
  // CONSTANTS
  const { character, setSelectedCharacter } = props;

  // FUNCTIONS
  const handleShow = () => setSelectedCharacter(character);

  return (
    <Card className="mx-2" onClick={handleShow} style={{ cursor: "pointer" }}>
      <Card.Img
        variant="top"
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
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
