import React from 'react';

import EmpDetailPresenter from './EmpDetailPresenter';

const Container = props => {
  const { companyInfo } = props;

  return <EmpDetailPresenter companyInfo={companyInfo} />;
};

export default Container;
