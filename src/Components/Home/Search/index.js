import React from "react";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";

export default function Search() {
  return (
    <div className="py-3 py-md-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <InputGroup size="lg">
            <FormControl
              placeholder="Character's name"
              aria-label="Character's name"
              aria-describedby="basic-character-name"
            />
            <Button variant="primary" id="button-character-name">
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
}
