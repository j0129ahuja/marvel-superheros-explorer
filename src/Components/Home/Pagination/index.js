import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function Pagination() {
  return (
    <Row className="justify-content-center p-3 p-md-4">
      <Col md={2} xs={6}>
        <Button size="lg" variant="light" className="rounded-1 px-3 w-100">
          Previous
        </Button>
      </Col>
      <Col md={2} xs={6}>
        <Button size="lg" variant="primary" className="rounded-1 px-3 w-100">
          Next
        </Button>
      </Col>
    </Row>
  );
}
