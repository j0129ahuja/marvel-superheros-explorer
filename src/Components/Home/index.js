import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { connect } from "react-redux";

import Characters from "./Characters";
import Pagination from "./Pagination";
import Search from "./Search";

function Home(props) {
  // CONSTANTS
  const { loadingCharacterList, characterList } = props;

  return (
    <Container fluid style={{ position: "relative" }}>
      {loadingCharacterList && (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{
            minHeight: "100%",
            minWidth: "100%",
            zIndex: 100,
            backgroundColor:
              characterList?.length > 0
                ? "rgba(255, 255, 255, 0.75)"
                : "rgba(255, 255, 255, 1)",
            position: "absolute",
          }}
        >
          <div className="d-flex align-items-center">
            <Spinner size="sm" animation="border" className="me-2" />
            <p className="mb-0">Fetching characters...</p>
          </div>
        </Container>
      )}
      <Container>
        <Search />

        <Characters />

        <Pagination />
      </Container>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  loadingCharacterList: state.loadingCharacterList,
  characterList: state.characterList,
});

export default connect(mapStateToProps)(Home);
