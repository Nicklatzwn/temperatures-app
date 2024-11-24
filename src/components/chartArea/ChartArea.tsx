import { getTemperaturesData, isYearAxis } from '@/store/temperatures';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery, useTheme } from '@mui/material';
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
import { FunctionComponent } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

const ChartArea: FunctionComponent = (): JSX.Element => {
  const data = useSelector(getTemperaturesData);
  const yearAxis = useSelector(isYearAxis);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 20,
      },
    },
    plugins: {
      legend: {
        display: !isMobile,
        align: 'center',
        position: 'bottom',
        labels: {
          padding: 7,
          font: {
            size: 10,
          },
          usePointStyle: true,
          color: theme.palette.text.primary,
        },
      },
      title: {
        display: true,
        text: yearAxis ? 'Yearly Temperatures' : 'Monthly Temperatures',
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
            const year = yearAxis ? tooltipItem.label : tooltipItem.dataset.label;
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
            max: (data.labels || []).length - 1,
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
          text: yearAxis ? 'Years' : 'Months',
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
    <Box flexGrow={1}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default ChartArea;
