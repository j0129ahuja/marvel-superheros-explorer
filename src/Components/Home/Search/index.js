import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";

import {
  setSearchText,
  setLoadingCharacterList,
  setCharacterList,
  setTotalCount,
  setSuggestionList,
  setLoadingSuggestionList,
} from "../../../store/actions";

function Search(props) {
  // CONSTANTS
  const {
    searchText,
    setSearchText,
    loadingSuggestionList,
    suggestionList,
    setLoadingCharacterList,
    setCharacterList,
    setTotalCount,
    currentPage,
    setSuggestionList,
    setLoadingSuggestionList,
  } = props;

  // STATES
  const [focused, setFocused] = useState(false);

  // FUNCTIONS
  const handleSelectSuggestion = (suggestion) => {
    setSearchText(suggestion);
    setFocused(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setFocused(false);
    if (searchText) {
      handleCharacterListFetch(searchText);
    } else {
      alert("Please enter some character name");
    }
  };

  const handleCharacterListFetch = (query = null) => {
    setLoadingCharacterList(true);

    fetch(
      query
        ? `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&orderBy=name&limit=3&offset=${
            (currentPage - 1) * 3
          }&ts=1632998235&apikey=ff7d1b4aefa575448f941959adefe76d&hash=bc74402412971310d7a50ccd0dff3c7b`
        : `https://gateway.marvel.com/v1/public/characters?orderBy=name&limit=3&offset=${
            (currentPage - 1) * 3
          }&ts=1632998235&apikey=ff7d1b4aefa575448f941959adefe76d&hash=bc74402412971310d7a50ccd0dff3c7b`
    )
      .then((response) => response.json())
      .then((json) => {
        const { results, total } = json.data;

        setCharacterList(results);
        setTotalCount(total);
        setLoadingCharacterList(false);
      })
      .catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    handleCharacterListFetch();
  }, [currentPage]);

  useEffect(() => {
    // console.log("searchText: ", searchText);

    if (searchText) {
      fetch(
        searchText
          ? `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchText}&orderBy=name&limit=5&offset=0&ts=1632998235&apikey=ff7d1b4aefa575448f941959adefe76d&hash=bc74402412971310d7a50ccd0dff3c7b`
          : `https://gateway.marvel.com/v1/public/characters?orderBy=name&limit=5&offset=0&ts=1632998235&apikey=ff7d1b4aefa575448f941959adefe76d&hash=bc74402412971310d7a50ccd0dff3c7b`
      )
        .then((response) => response.json())
        .then((json) => {
          const { results } = json.data;

          setSuggestionList(results);
          setLoadingSuggestionList(false);
        })
        .catch((error) => console.log(error));
    }
  }, [searchText]);

  return (
    <div className="py-3 py-md-5">
      <Row className="justify-content-center">
        <Col md={6} className="p-0 m-0" style={{ position: "relative" }}>
          <Form>
            <InputGroup size="lg">
              <FormControl
                placeholder="Character's name"
                aria-label="Character's name"
                aria-describedby="basic-character-name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setFocused(true)}
              />
              <Button
                variant="primary"
                id="button-character-name"
                onClick={handleSearch}
                type="submit"
              >
                Search
              </Button>
            </InputGroup>
          </Form>
          {focused && searchText && (
            <div
              className="shadow rounded bg-white"
              style={{ position: "absolute", zIndex: 50, width: "100%" }}
            >
              {loadingSuggestionList && (
                <p className="mb-0 small ps-3 p-2 shadow-sm">
                  Please wait, while we fetch some suggestions for you...
                </p>
              )}
              {suggestionList?.length > 0
                ? suggestionList?.map((suggestion) => (
                    <p
                      onClick={() => handleSelectSuggestion(suggestion.name)}
                      className="mb-0 ps-3 p-2 shadow-sm"
                      key={suggestion.id}
                    >
                      {suggestion.name}
                    </p>
                  ))
                : !loadingSuggestionList && (
                    <p className="mb-0 small ps-3 p-2 shadow-sm">
                      <i>No results available, try to search something else</i>
                    </p>
                  )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchText: state.searchText,
  loadingSuggestionList: state.loadingSuggestionList,
  suggestionList: state.suggestionList,
  currentPage: state.currentPage,
});

export default connect(mapStateToProps, {
  setSearchText,
  setLoadingCharacterList,
  setCharacterList,
  setTotalCount,
  setSuggestionList,
  setLoadingSuggestionList,
})(Search);
