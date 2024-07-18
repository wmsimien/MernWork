import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/form/FormInput';

import { createVaccine } from '../../state/vaccine/vaccineActions';
//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from 'sonner';
import './vaccines.css';

const Vaccines = () => {
  const [values, setValues] = useState({
    name: '',
    type: '',
    price: '',
    sideEffect: '',
    origin: '',
    doseRequired: '',
    otherInfo: '',
    active: '',
    startDate: '',
    endDate: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Enter vaccine name',
      errorMessage: 'Vaccine name should be at lease one character!',
      label: 'Vaccine Name',
      pattern: '^.*[a-zA-Z0-9]+.*$',
      required: true,
    },
    {
      id: 2,
      name: 'type',
      type: 'text',
      placeholder: 'Enter type of vaccine',
      errorMessage: 'Vaccine Type is required!',
      label: 'Type',
      pattern: '^.*[a-zA-Z0-9]+.*$',
      required: true,
    },
    {
      id: 3,
      name: 'price',
      type: 'text',
      placeholder: 'Enter price',
      errorMessage: 'Price should be entered!',
      label: 'Price',
      pattern: '^[0-9]*(.+)?$',
      required: true,
    },
    {
      id: 4,
      name: 'sideEffect',
      type: 'text',
      placeholder: 'Enter any side effects',
      label: 'Side Effect(s)',
      required: false,
    },
    {
      id: 5,
      name: 'origin',
      type: 'text',
      placeholder: 'Enter origin of vaccine',
      errorMessage: 'Vaccine origin should be at lease one character!',
      label: 'Vaccine Origin',
      pattern: '^.*[a-zA-Z]+.*$',
      required: true,
    },
    {
      id: 6,
      name: 'doseRequired',
      type: 'number',
      errorMessage: 'Number of dose required should be entered!',
      label: 'Dose Required',
      pattern: '^[0-9]*(.+)?$',
      required: true,
    },
    {
      id: 7,
      name: 'otherInfo',
      type: 'text',
      placeholder: 'Enter any other information',
      label: 'Other Info',
      required: false,
    },
    {
      id: 8,
      name: 'startDate',
      type: 'date',
      label: 'Availability Start Date',
      required: false,
    },
    {
      id: 9,
      name: 'endDate',
      type: 'date',
      label: 'Availability End Date',
      required: false,
    },
    {
      id: 10,
      name: 'active',
      type: 'checkbox',
      label: 'Active',
      required: false,
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addVaccine = () => {
    dispatch(createVaccine({ ...values }));

    navigate('/vaccines');

    return toast.success('Vaccine has been saved.', {
      position: 'top-center',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVaccine();
  };

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setValues({ ...values, [e.target.name]: e.target.checked });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleReset = () => {
    inputs.map((input) => setValues({ ...values, [input.name]: '' }));
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <div className="vaccine-container">
      <h1>Add Vaccine</h1>
      <form onSubmit={handleSubmit}>
        <div className="vaccine-inputs">
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={handleChange}
            />
          ))}
        </div>
        <button className="vaccine-btn">Add</button>
        <Toaster richColors />
      </form>
    </div>
  );
};

export default Vaccines;
