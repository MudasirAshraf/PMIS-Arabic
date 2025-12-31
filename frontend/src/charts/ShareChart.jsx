import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BrowserShareChart = () => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: 150, 
      width: 160, 
      backgroundColor: null,  
      margin: [0, 10, 0,10], 
      spacing: [0, 0, 0, 0], 
    },
    title: {
      text: '',
      align: 'center',
      verticalAlign: 'middle',
      y: 60,
      style: {
        fontSize: '1.1em',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    credits: {
      enabled: false, 
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '124%',
      },
    },
    series: [
        {
            type: 'pie',
            name: 'Browser share',
            innerSize: '50%',
            data: [
              ['', 23.86, '#9b1313'], 
              ['', 8.97, '	#FFFF00'],  
              ['', 12.52, '#053305'], 
            ].map(([name, value, color]) => ({
              name,
              y: value,
              color,  
            })),
          },
        ],
      };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BrowserShareChart;
