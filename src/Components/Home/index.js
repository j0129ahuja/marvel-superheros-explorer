import React from "react";
import { Container } from "react-bootstrap";

import Characters from "./Characters";
import Pagination from "./Pagination";
import Search from "./Search";

export default function Home() {
  return (
    <Container fluid>
      <Container>
        <Search />

        <Characters />

        <Pagination />
      </Container>
    </Container>
  );
}
