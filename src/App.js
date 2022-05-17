import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import NoMatch from "./Components/NoMatch";

import {
  setLoadingCharacterList,
  setCharacterList,
  setTotalCount,
} from "./store/actions";

function App(props) {
  // CONSTANTS
  const {
    setLoadingCharacterList,
    setCharacterList,
    setTotalCount,
    currentPage,
  } = props;

  // FUNCTIONS
  useLayoutEffect(() => {
    setLoadingCharacterList(true);

    fetch(
      `https://gateway.marvel.com/v1/public/characters?orderBy=name&limit=3&offset=${
        (currentPage - 1) * 3
      }&ts=1632998235&apikey=ff7d1b4aefa575448f941959adefe76d&hash=bc74402412971310d7a50ccd0dff3c7b`
    )
      .then((response) => response.json())
      .then((json) => {
        const { count, limit, offset, results, total } = json.data;

        setCharacterList(results);
        setTotalCount(total);
        setLoadingCharacterList(false);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
});

export default connect(mapStateToProps, {
  setLoadingCharacterList,
  setCharacterList,
  setTotalCount,
})(App);
