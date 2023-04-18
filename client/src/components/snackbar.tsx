import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarContext } from '../context/snackbar-context';

// type Props = {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function SimpleSnackbar() {

  const { open, setOpen } = React.useContext(SnackbarContext)
  
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Item has been added to cart"
        action={action}
        className='snackbar'
      />
    </div>
  );
}