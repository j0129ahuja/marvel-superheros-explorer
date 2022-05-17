import React, { useMemo } from "react";
import { Card, Col, Row, Offcanvas, Image } from "react-bootstrap";
import { connect } from "react-redux";

import { setSelectedCharacter } from "../../../store/actions";

function Characters(props) {
  // CONSTANTS
  const { selectedCharacter, setSelectedCharacter } = props;
  const show = useMemo(
    () => Object.keys(selectedCharacter).length > 0,
    [selectedCharacter]
  );

  // FUNCTIONS
  const handleClose = () => setSelectedCharacter({});
  const handleShow = (character) => setSelectedCharacter(character);

  return (
    <>
      <Row xs={1} md={3} className="g-2 mb-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Col
            key={idx}
            onClick={() => handleShow({ name: "Character name" })}
            style={{ cursor: "pointer" }}
          >
            <Card className="mx-2">
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>Character name</Card.Title>
                <Card.Text>Description</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Modified timestamp</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Offcanvas show={show} onHide={handleClose} className="w-50">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Character name</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Image src="" title="Character Image" />

          <p>Description</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

const mapStateToProps = (state) => ({
  selectedCharacter: state.selectedCharacter,
});

export default connect(mapStateToProps, { setSelectedCharacter })(Characters);
