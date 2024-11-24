import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Snackbar,
  Stack,
  SxProps,
  Theme,
} from '@mui/material';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  clear,
  clearError,
  getTemperaturesError,
  hasTemperaturesData,
  isTemperaturesLoading,
} from '@/store/temperatures';
import { useAppDispatch } from '@/store/store';
import { ChartArea } from '@/components/chartArea';
import { Controls } from '@/components/controls';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Dashboard: FunctionComponent = (): JSX.Element => {
  const temperaturesError = useSelector(getTemperaturesError);
  const temperaturesLoading = useSelector(isTemperaturesLoading);
  const isTemperaturesData = useSelector(hasTemperaturesData);

  const dispatch = useAppDispatch();
  const onReset = () => dispatch(clear());

  const cardStyles: SxProps<Theme> = {
    height: isTemperaturesData ? '100%' : 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Stack height="100%" padding={2}>
      <Card sx={cardStyles} variant="outlined">
        <CardHeader
          title="Temperatures"
          action={
            temperaturesLoading ? (
              <Stack padding={1}>
                <CircularProgress size={20} />
              </Stack>
            ) : (
              <IconButton children={<RestartAltIcon />} onClick={onReset} />
            )
          }
        />
        <CardContent sx={cardStyles}>
          <Controls />
          {isTemperaturesData && <ChartArea />}
        </CardContent>
      </Card>
      <Snackbar open={!!temperaturesError} onClose={() => dispatch(clearError())}>
        <Alert severity="error" variant="filled">
          {temperaturesError}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Dashboard;
