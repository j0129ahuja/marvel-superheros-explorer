import React, { useMemo } from "react";
import { Card, Col, Row, Offcanvas, Image } from "react-bootstrap";
import { connect } from "react-redux";

import { setSelectedCharacter } from "../../../store/actions";

function Characters(props) {
  // CONSTANTS
  const { characterList, selectedCharacter, setSelectedCharacter } = props;
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
        {characterList.map((character) => (
          <Col key={character.id}>
            <Card
              className="mx-2"
              onClick={() => handleShow(character)}
              style={{ cursor: "pointer" }}
            >
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
                <small className="text-muted">
                  Modified: {character.modified}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {show && (
        <Offcanvas show={show} onHide={handleClose} className="w-50">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{selectedCharacter.name}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="px-3 px-md-4 pb-4">
              <Image
                src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
                title={selectedCharacter.name}
                className="img-fluid mb-3 mb-md-4"
                style={{ height: "300px", width: "auto" }}
              />

              <p className="fw-bold text-uppercase">Description</p>
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
                      <li className="">
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
                    <a
                      href={selectedCharacter?.comics?.collectionURI}
                      target="_blank"
                    >
                      [Collection]
                    </a>
                  )}
                </p>
                {selectedCharacter?.comics?.items?.length > 0 ? (
                  <ol>
                    {selectedCharacter?.comics?.items?.map((url, idx) => (
                      <li className="">
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
                    <a
                      href={selectedCharacter?.series?.collectionURI}
                      target="_blank"
                    >
                      [Collection]
                    </a>
                  )}
                </p>
                {selectedCharacter?.series?.items?.length > 0 ? (
                  <ol>
                    {selectedCharacter?.series?.items?.map((url, idx) => (
                      <li className="">
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
                    <a
                      href={selectedCharacter?.stories?.collectionURI}
                      target="_blank"
                    >
                      [Collection]
                    </a>
                  )}
                </p>
                {selectedCharacter?.stories?.items?.length > 0 ? (
                  <ol>
                    {selectedCharacter?.stories?.items?.map((url, idx) => (
                      <li className="">
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
                    <a
                      href={selectedCharacter?.events?.collectionURI}
                      target="_blank"
                    >
                      [Collection]
                    </a>
                  )}
                </p>
                {selectedCharacter?.events?.items?.length > 0 ? (
                  <ol>
                    {selectedCharacter?.events?.items?.map((url, idx) => (
                      <li className="">
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
