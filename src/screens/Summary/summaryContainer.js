import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';

import Summary from './summaryPresenter';
import { TOP_EMPLOYERS } from './summaryQueries';
import { EMPLOYERS } from '../EmployerList/EmployerListQueries';
import { GET_CURRENT_FAIR_ID, GET_SOCIAL_PROVIDER } from '../../Apollo/sharedQueries';

const Container = () => {
  const [fairId, setFairId] = useState(null);
  const [topList, setTopList] = useState(null);

  const { data: { currentFairId } } = useQuery(GET_CURRENT_FAIR_ID);
  const { data: { socialProvider } } = useQuery(GET_SOCIAL_PROVIDER);
  const { data: topEmployersData, loading } = useQuery(TOP_EMPLOYERS, {
    variables: { fairId },
    skip: !fairId || !socialProvider,
  });
  // Get employers in current fair from cache
  const { refetch: getEmployersCache } = useQuery(EMPLOYERS, {
    skip: true,
  });

  /** update fairId state */
  useEffect(() => {
    if (currentFairId) {
      setFairId(currentFairId);
    }
  }, [currentFairId])

  /** update top employers state */
  const updateComponentState = async (topEmployerData) => {
    const { data: { getEmployerList: { companies } } } = await getEmployersCache({
      fetchPolicy: 'cache-only',
      fairId,
      isUser: socialProvider !== null,
    });

    const filteredEmpls = [];
    topEmployerData.forEach(employer => {
      const employerId = employer.id;
      const employerData = companies.find(company => company.employer.id === employerId);
      if (employerData) {
        filteredEmpls.push(employerData);
      }
    });

    setTopList(filteredEmpls);
  };

  useEffect(() => {
    if (!loading && topEmployersData && topEmployersData.getTopEmployerList) {
      const { getTopEmployerList } = topEmployersData;
      updateComponentState(getTopEmployerList);
    }
  }, [topEmployersData])

  return <Summary socialProvider={socialProvider} topList={topList} />;
}

export default Container;
