import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import GenderPieChart from './GenderPieChart';

import { listClients } from '../../../state/client/clientActions';

const margin = { top: 80, right: -570, bottom: 80, left: 70 };
const width = 800 - margin.left - margin.right;
const height = 700 - margin.top - margin.bottom;
const radius = width / 2;

const PieGender = () => {
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
      {clients && (
        <>
          <GenderPieChart
            chartWidth={width}
            chartHeight={height}
            chartRadius={radius}
            chartData={clients}
          />
        </>
      )}
    </div>
  );
};

export default PieGender;
