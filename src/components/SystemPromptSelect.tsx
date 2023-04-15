import { Autocomplete, TextField } from '@mui/material';

const SystemPromptSelect = ({ promptOptions, setSelectedPrompt }) => {
  return (
    <Autocomplete
      className='mb-2'
      options={promptOptions}
      onChange={(event, value) => {
        setSelectedPrompt(value?.value);
      }}
      renderInput={(params) => <TextField {...params} label='Select Prompt' />}
    />
  );
};

export default SystemPromptSelect;
