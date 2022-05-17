import React, { useMemo } from "react";
import { Card, Col, Row, Offcanvas, Image } from "react-bootstrap";
import { connect } from "react-redux";

import { setSelectedCharacter } from "../../../store/actions";
import CharacterCard from "./CharacterCard";
import CharacterDetails from "./CharacterDetails";

function Characters(props) {
  // CONSTANTS
  const { characterList, selectedCharacter, setSelectedCharacter } = props;
  const show = useMemo(
    () => Object.keys(selectedCharacter).length > 0,
    [selectedCharacter]
  );

  // FUNCTIONS
  const handleClose = () => setSelectedCharacter({});

  return (
    <>
      {characterList?.length > 0 ? (
        <Row xs={1} md={3} className="g-2 mb-3">
          {characterList.map((character) => (
            <Col key={character.id}>
              <CharacterCard character={character} />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="p-4 p-md-5 text-center">
          <i>No results available, try to search something else</i>
        </p>
      )}

      {show && (
        <Offcanvas show={show} onHide={handleClose} className="w-md-50">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{selectedCharacter.name}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CharacterDetails />
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  characterList: state.characterList,
  selectedCharacter: state.selectedCharacter,
});

export default connect(mapStateToProps, { setSelectedCharacter })(Characters);
