import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const ModelSelect = ({ modelOptions, setSelectedModel }) => {
  return (
    <Autocomplete
      className='mb-2 autocomplete-wrapper'
      options={modelOptions}
      onChange={(event, value) => {
        setSelectedModel(value?.value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Select Model'
          sx={{ border: 'none' }}
          InputProps={{ ...params.InputProps, className: 'autocomplete-input' }}
          InputLabelProps={{ className: 'autocomplete-label' }}
        />
      )}
    />
  );
};

export default ModelSelect;
