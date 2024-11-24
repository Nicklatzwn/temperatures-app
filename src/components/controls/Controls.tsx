import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FileUpload } from './fileUpload';
import { TypeSelector } from './typeSelector';
import { YearSelector } from './yearSelector';
import { FunctionComponent } from 'react';

const Controls: FunctionComponent = (): JSX.Element => {
  return (
    <Box sx={{ flexShrink: 1 }}>
      <Grid container spacing={1}>
        <Grid size={{ md: 'grow', xs: 12 }}>
          <FileUpload />
        </Grid>
        <Grid size={{ md: 2, xs: 6 }}>
          <TypeSelector />
        </Grid>
        <Grid size={{ md: 2, xs: 6 }}>
          <YearSelector />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Controls;
