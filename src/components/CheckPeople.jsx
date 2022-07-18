import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CheckPeople = ({ setPeople }) => {
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    setNumber(e.target.value);
    setPeople(e.target.value);
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
          <MenuItem value={2}>2인</MenuItem>
          <MenuItem value={3}>3인</MenuItem>
          <MenuItem value={4}>4인</MenuItem>
          <MenuItem value={5}>5인</MenuItem>
          <MenuItem value={6}>6인</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default CheckPeople;
