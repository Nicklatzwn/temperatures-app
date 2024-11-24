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

/**
 * @component Dashboard
 * @returns {JSX.Element} A dashboard UI consisting of a card layout with controls, a chart, a loading indicator, and error handling.
 * @description
 * The `Dashboard` component serves as the primary interface for managing and visualizing temperature data. It displays a card that includes:
 * - **Controls**: Input elements for filtering and managing data.
 * - **Chart**: A data visualization area (displayed only when data is available).
 * - **Loading Indicator**: A spinner shown while temperature data is being processed.
 * - **Error Handling**: An alert to notify users of any errors during data processing.
 * @features
 * - **Dynamic Chart Display**: The chart is displayed only when temperature data is available.
 * - **Error Notification**: Displays a `Snackbar` with an alert message for any errors that occur.
 * - **Reset Functionality**: A reset button allows users to clear all temperature data and start fresh.
 * - **Loading State**: Displays a spinner while temperature data is being processed.
 * - **Responsive Design**: Layout adapts to different screen sizes and resolutions.
 * @limitations
 * - Requires data and state management from the Redux store.
 * - If no error message is provided, the error alert remains hidden.
 * - The chart is not rendered when no temperature data is available.
 */
const Dashboard: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const temperaturesError = useSelector(getTemperaturesError);
  const temperaturesLoading = useSelector(isTemperaturesLoading);
  const isTemperaturesData = useSelector(hasTemperaturesData);
  const cardStyles: SxProps<Theme> = {
    height: isTemperaturesData ? '100%' : 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  /**
   * Resets the temperatures data from the store.
   *
   * This function is triggered when the reset button is clicked. It dispatches the `clear` action to clear the temperatures data from the store.
   */
  const onReset = () => dispatch(clear());

  /**
   * Dispatches an action to clear the current error message from the store.
   *
   * This function is invoked to reset any error state in the store. It dispatches the `clearError` action
   * to remove the error message, allowing the application to continue without showing the error notification.
   */
  const onClearError = () => dispatch(clearError());

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
      <Snackbar open={!!temperaturesError} onClose={onClearError}>
        <Alert severity="error" variant="filled">
          {temperaturesError}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Dashboard;
