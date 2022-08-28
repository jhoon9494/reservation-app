import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CheckRooms = ({ setRoomInfo, availableRooms, roomInfo }) => {
  const [room, setRoom] = useState('');

  useEffect(() => {
    setRoom(roomInfo);
  }, [roomInfo]);

  const handleChange = (e) => {
    setRoom(e.target.value);
    setRoomInfo(e.target.value);
  };

  return (
    <FormControl variant="standard" style={{ width: '300px' }}>
      <InputLabel id="checkRoom" style={{ color: '#a9a9a9' }}>
        객실명
      </InputLabel>
      <Select
        labelId="checkRoom"
        value={room}
        id="Room"
        label="Room"
        onChange={handleChange}
      >
        {availableRooms.map((room) => {
          return (
            <MenuItem key={room.name} value={room._id}>
              {room.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CheckRooms;
