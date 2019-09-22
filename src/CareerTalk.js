import React, { useState } from 'react';

import { PublicRouter, PrivateRouter } from './Router';

/** CareerTalk using React Hooks and Graphql */
const CareerTalk = ({ isLoggedIn }) => {
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);

  return <Router isLoggedInState={isLoggedInState} setIsLoggedInState={setIsLoggedInState} />;
};

const Router = ({ isLoggedInState, setIsLoggedInState }) => (isLoggedInState ? (
  <PrivateRouter setIsLoggedInState={setIsLoggedInState} />
) : (
  <PublicRouter setIsLoggedInState={setIsLoggedInState} />
));

export default CareerTalk;
