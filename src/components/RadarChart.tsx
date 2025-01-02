import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Dimension } from '../types/types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  dimensions: Dimension[];
}

export function RadarChart({ dimensions }: RadarChartProps) {
  const data = {
    labels: dimensions.map(d => d.label),
    datasets: [
      {
        label: 'Din Profil',
        data: dimensions.map(d => d.score),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Radar data={data} options={options} />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {dimensions.map((dimension) => (
          <div key={dimension.key} className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700">{dimension.label}</h4>
            <p className="text-sm text-gray-500">{dimension.description}</p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dimension.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
