import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const InputComponent = ({
  title,
  contents,
  setSelectedValue,
  selectedValue,
}) => {
  React.useEffect(() => {
    // console.log(selectedValue);
  });

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <FormControl
      variant="standard"
      style={{ margin: '0 auto', width: '150px' }}
    >
      <InputLabel id={title} style={{ color: '#a9a9a9' }}>
        {title}
      </InputLabel>
      <Select
        labelId={title}
        id={title}
        defaultValue=""
        value={selectedValue}
        label={title}
        onChange={handleChange}
      >
        {contents.map((content) => {
          return React.Children.toArray(
            <MenuItem value={content._id ? content._id : content}>
              {content.name ? content.name : content}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default InputComponent;
