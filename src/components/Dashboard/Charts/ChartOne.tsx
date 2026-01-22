'use client';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { MONTHLYGRAPH } from 'types/general';

const ChartOne = ({ chartData }: { chartData: MONTHLYGRAPH }) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const labelColor = isDark ? '#ffffff' : '#374151';
  const chartOptions: ApexOptions = {
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      foreColor: labelColor,
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: { show: true },
    },
    responsive: [
      { breakpoint: 1024, options: { chart: { height: 300 } } },
      { breakpoint: 1366, options: { chart: { height: 350 } } },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '12px',
        colors: ['#000'],
      },

      background: {
        enabled: true,
        borderRadius: 2,
      },
    },
    markers: {
      size: 4,
      colors: '#000',
      strokeWidth: 3,
      fillOpacity: 1,
      hover: { sizeOffset: 5 },
    },
    xaxis: {
      type: 'category',
      categories: chartData?.categories || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { style: { fontSize: '0px' } },
      min: 0,
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
  };

  return (
    <div className="col-span-12 rounded-xl border border-stroke p-7 shadow-default xl:col-span-8 bg-white dark:bg-transparent">
      <div className="inline-flex appearance-none py-1 text-sm font-medium dark:text-white">
        Monthly Statistics
      </div>
      {chartData && (
        <ReactApexChart
          options={chartOptions}
          series={chartData.series}
          type="area"
          height={350}
          width="100%"
          className="bg-white dark:bg-transparent"
        />
      )}
    </div>
  );
};

export default ChartOne;
