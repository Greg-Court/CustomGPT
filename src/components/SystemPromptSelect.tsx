import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import PromptModal from './PromptsManager';

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
    { label: 'Edit Prompts...', value: 'edit-prompts' },
  ];

  console.log(updatedPromptOptions)

  return (
    <>
      <Autocomplete
        className='mb-2 autocomplete-wrapper'
        options={updatedPromptOptions}
        getOptionLabel={(option) => option.label}
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
