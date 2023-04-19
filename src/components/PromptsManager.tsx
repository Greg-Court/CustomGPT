import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { getPrompts, createPrompt, deletePrompt } from '../api/firebaseApi';

const PromptsManager = ({ userUid, open, handleClose }) => {
  const [prompts, setPrompts] = useState([]);
  const [newPromptName, setNewPromptName] = useState('');
  const [newPromptContent, setNewPromptContent] = useState('');

  useEffect(() => {
    if (userUid) {
      const fetchPrompts = async () => {
        const promptsSnapshot = await getPrompts(userUid);
        setPrompts(
          promptsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      };

      fetchPrompts();
    }
  }, [userUid, open]);

  const handleAddPrompt = async () => {
    const newPrompt = await createPrompt(
      userUid,
      newPromptContent,
      newPromptName
    );
    setPrompts([...prompts, { ...newPrompt.data(), id: newPrompt.id }]);
    setNewPromptName('');
    setNewPromptContent('');
  };

  const handleDeletePrompt = async (id) => {
    await deletePrompt(userUid, id);
    setPrompts(prompts.filter((prompt) => prompt.id !== id));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>Edit Prompts</DialogTitle>
      <DialogContent>
        <List>
          {prompts.map((prompt) => (
            <ListItem key={prompt.id}>
              <ListItemText primary={prompt.name} secondary={prompt.content} />
              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  onClick={() => handleDeletePrompt(prompt.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <TextField
          label='New Prompt Name'
          value={newPromptName}
          onChange={(e) => setNewPromptName(e.target.value)}
          fullWidth
        />
        <TextField
          label='New Prompt Content'
          value={newPromptContent}
          onChange={(e) => setNewPromptContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddPrompt} startIcon={<Add />}>
          Add Prompt
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromptsManager;
