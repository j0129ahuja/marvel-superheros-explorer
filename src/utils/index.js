export const getState = (attr) => {
  try {
    const localState = localStorage.getItem(`${attr}`);

    if (!localState) return undefined;
    return JSON.parse(localState);
  } catch (err) {
    return undefined;
  }
};

export const setState = (attr, val) => {
  try {
    const localState = JSON.stringify(val);

    localStorage.setItem(`${attr}`, localState);
  } catch (err) {
    console.error(err);
  }
};
