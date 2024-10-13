'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';

interface ShipmentCardProps {
  dataSet: number[] | undefined;
  daysInMonth?: number;
  label: string;
  title: string;
}

const ChartEvents: FC<ShipmentCardProps> = ({
  dataSet,
  daysInMonth,
  label,
  title,
}) => {
  const labels: (number | string)[] = [];

  if (daysInMonth) {
    for (let i = 1; i <= daysInMonth; i++) {
      labels.push(i);
    }
  } else {
    labels.push(
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    );
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: dataSet,
        borderColor: 'rgb(0,181,226)',
        backgroundColor: 'rgba(0,181,226,0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ChartEvents;