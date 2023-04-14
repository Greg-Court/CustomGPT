import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ModelSelect = ({modelOptions}) => {
  return (
    <FormControl className='my-2'>
      <InputLabel id='model-select-label' className='text-gray-200'>
        Select Model
      </InputLabel>
      <Select
        className='text-gray-200'
        label='Yeboi'
        labelId='model-select-label'
      >
        {modelOptions.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModelSelect;
