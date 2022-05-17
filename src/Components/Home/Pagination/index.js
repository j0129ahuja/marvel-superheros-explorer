import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { setCurrentPage } from "../../../store/actions";

function Pagination(props) {
  // CONSTANTS
  const { currentPage, setCurrentPage, totalCount, characterList } = props;

  // FUNCTIONS
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    else alert("Page cannot be less than 1");
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Row className="align-items-center justify-content-center p-3 p-md-4">
      <Col md={2} xs={6}>
        <Button
          size="lg"
          variant="light"
          className="rounded-1 px-3 w-100"
          onClick={handlePrevious}
          disabled={characterList?.length === 0}
        >
          Previous
        </Button>
      </Col>
      <Col md={1}>
        {characterList?.length === 0 ? (
          <p
            className="mb-0 text-center fw-bold lead border rounded"
            style={{ cursor: "default" }}
          >
            0 / 0
          </p>
        ) : (
          <p
            className="mb-0 text-center fw-bold lead border rounded"
            style={{ cursor: "default" }}
          >
            {currentPage} / {Math.ceil(totalCount / 3)}
          </p>
        )}
      </Col>
      <Col md={2} xs={6}>
        <Button
          size="lg"
          variant="primary"
          className="rounded-1 px-3 w-100"
          onClick={handleNext}
          disabled={characterList?.length === 0}
        >
          Next
        </Button>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  totalCount: state.totalCount,
  characterList: state.characterList,
});

export default connect(mapStateToProps, { setCurrentPage })(Pagination);
