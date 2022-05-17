import React, { useLayoutEffect, useState, useMemo } from "react";
import { Col, Container, Row, Spinner, Offcanvas } from "react-bootstrap";
import { getState } from "../../utils";
import CharacterCard from "../Home/Characters/CharacterCard";
import CharacterDetails from "../Home/Characters/CharacterDetails";

function Saved() {
  // STATES
  const [savedCharacters, setSavedCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState({});

  // CONSTANTS
  const show = useMemo(
    () => Object.keys(currentCharacter).length > 0,
    [currentCharacter]
  );

  // FUNCTIONS
  useLayoutEffect(() => {
    let savedList = getState("saved");

    if (savedList?.length > 0) {
      setSavedCharacters(savedList);
    }

    setLoading(false);
  }, []);

  return (
    <Container fluid style={{ position: "relative" }}>
      {loading && (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{
            minHeight: "100%",
            minWidth: "100%",
            zIndex: 100,
            backgroundColor:
              savedCharacters?.length > 0
                ? "rgba(255, 255, 255, 0.75)"
                : "rgba(255, 255, 255, 1)",
            position: "absolute",
          }}
        >
          <div className="d-flex align-items-center">
            <Spinner size="sm" animation="border" className="me-2" />
            <p className="mb-0">Fetching saved characters...</p>
          </div>
        </Container>
      )}
      <Container>
        <div className="py-3 py-md-5">
          <h2 className="text-center">Saved Characters</h2>
        </div>

        {savedCharacters?.length > 0 ? (
          <Row xs={1} md={3} className="g-2 mb-3">
            {savedCharacters.map((character) => (
              <Col key={character.id}>
                <CharacterCard
                  handleShow={() => setCurrentCharacter(character)}
                  character={character}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="p-4 p-md-5 text-center">
            <i>No results available, try to search something else</i>
          </p>
        )}

        {show && (
          <Offcanvas
            show={show}
            onHide={() => setCurrentCharacter({})}
            className="w-md-50"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>{currentCharacter.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <CharacterDetails selectedCharacter={currentCharacter} />
            </Offcanvas.Body>
          </Offcanvas>
        )}
      </Container>
    </Container>
  );
}

export default Saved;
