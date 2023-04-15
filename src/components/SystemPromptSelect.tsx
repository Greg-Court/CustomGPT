import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import PromptModal from './PromptModal';

const SystemPromptSelect = ({ promptOptions, setSelectedPrompt, userUid }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const updatedPromptOptions = [
    ...promptOptions,
    { title: 'Edit Prompts', value: 'edit-prompts' },
  ];

  return (
    <>
      <Autocomplete
        className='mb-2 autocomplete-wrapper'
        options={updatedPromptOptions}
        getOptionLabel={(option) => option.title} // Add this line
        onChange={(event, value) => {
          if (value?.value === 'edit-prompts') {
            handleModalOpen();
          } else {
            setSelectedPrompt(value?.value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Select Prompt'
            InputProps={{
              ...params.InputProps,
              className: 'autocomplete-input',
            }}
            InputLabelProps={{ className: 'autocomplete-label' }}
          />
        )}
      />
      <PromptModal
        userUid={userUid}
        open={modalOpen}
        handleClose={handleModalClose}
      />
    </>
  );
};

export default SystemPromptSelect;
