'use client';

import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { WEEKLYGRAPH } from 'types/general';
import { useEffect, useState } from 'react';

const ChartTwo = ({ chartData }: { chartData: WEEKLYGRAPH }) => {
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

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: labelColor,
    },
    xaxis: {
      categories: chartData?.categories,
      labels: {
        style: {
          colors: Array(chartData?.categories?.length || 0).fill(labelColor),
        },
      },
    },
    yaxis: {
      labels: {
        style: { colors: [labelColor] },
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: { borderRadius: 0, columnWidth: '25%' },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '25%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: { enabled: false },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      labels: { colors: [labelColor] },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    fill: { opacity: 1 },
  };

  return (
    <div className="col-span-12 rounded-xl border border-stroke p-7 shadow-default xl:col-span-4 dark:bg-transparent">
      <p className="inline-flex appearance-none py-1 text-sm font-medium dark:text-white">
        Weekly Statistics
      </p>
      <div id="chartTwo">
        {chartData && (
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="bar"
            height={350}
            width="100%"
            className="bg-white dark:bg-transparent"
          />
        )}
      </div>
    </div>
  );
};

export default ChartTwo;
