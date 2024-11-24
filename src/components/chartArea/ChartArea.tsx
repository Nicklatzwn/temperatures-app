import { getTemperaturesData, isAnnual } from '@/store/temperatures';
import { useSelector } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { months } from '@/assets/consts';
import { FunctionComponent } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

const ChartArea: FunctionComponent = (): JSX.Element => {
  const data = useSelector(getTemperaturesData);
  const annual = useSelector(isAnnual);
  const theme = useTheme();

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          color: theme.palette.text.primary,
        },
      },
      title: {
        display: true,
        text: annual ? 'Yearly Average Temperatures' : 'Monthly Temperatures',
        color: theme.palette.text.primary,
      },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          title: (tooltipItems) => {
            const temperature = tooltipItems[0]?.parsed.y.toFixed(2) || '';
            return `Temperature: ${temperature} °C`;
          },
          label: (tooltipItem) => {
            const year = annual ? tooltipItem.label : tooltipItem.dataset.label;
            return ` ${year}`;
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
          },
          drag: {
            enabled: true,
            backgroundColor: theme.palette.grey[500],
          },
          mode: 'x',
        },
        limits: {
          x: {
            min: 0,
            max: months.length - 1,
            minRange: 2,
          },
        },
      },
    },
    hover: {
      mode: 'dataset',
    },
    scales: {
      x: {
        title: {
          display: true,
          text: annual ? 'Years' : 'Months',
          color: theme.palette.text.primary,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: theme.palette.text.primary,
        },
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default ChartArea;
