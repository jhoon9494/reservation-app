import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CheckPeople = ({ setPeople, peopleNumber }) => {
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    setNumber(e.target.value);
    setPeople(e.target.value);
  };

  const makeArray = () => {
    const people = [];
    for (let i = 2; i <= peopleNumber; i++) {
      people.push(i);
    }
    return people;
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="checkPeopleNumber">인원수</InputLabel>
        <Select
          labelId="checkPeopleNumber"
          id="peopleNumber"
          value={number}
          label="peopleNumber"
          onChange={handleChange}
        >
          {makeArray().map((peopleNum) => {
            return (
              <MenuItem key={`인원수-${peopleNum}`} value={peopleNum}>
                {peopleNum}인
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default CheckPeople;
