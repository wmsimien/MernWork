import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GenderBarChart from './GenderBarChart';

import { listClients } from '../../../state/client/clientActions';

const margin = { top: 80, right: 30, bottom: 40, left: 80 };
const width = 290 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

const BarGender = () => {
  const clientList = useSelector((state) => state.clientListReducer);
  const { clients } = clientList;

  const dispatch = useDispatch();

  const listAllClients = () => {
    dispatch(listClients());
  };

  useEffect(() => {
    listAllClients();
  }, []);

  return (
    <div>
      BarGender
      {clients && (
        <>
          <GenderBarChart
            chartWidth={width}
            chartHeight={height}
            chartData={clients}
          />
        </>
      )}
    </div>
  );
};

export default BarGender;
