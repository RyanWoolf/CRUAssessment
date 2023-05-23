import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chart from 'react-apexcharts';
import shiftsData from '../../public/files/shifts.json'
import employeesList from '../../public/files/employees.json'

function getWeekDateRange(year, weekNumber) {
  const startDate = new Date(year, 0, (weekNumber - 1) * 7 + 1);
  const endDate = new Date(year, 0, (weekNumber - 1) * 7 + 7);

  // Adjust the start date to the nearest Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Adjust the end date to the nearest Saturday
  endDate.setDate(endDate.getDate() + (endDate.getDay()));

  // Set start time to midnight (00:00:00)
  startDate.setHours(0, 0, 0, 0);

  // Set end time to midnight (00:00:00) of the next day
  endDate.setHours(0, 0, 0, 0);
  endDate.setDate(endDate.getDate() + 1);

return { startDate, endDate };
}

const ShiftTable = ({ staffId, week, day }) => {
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetching data from DB in case of real db
    fetch('../../public/files/shifts.json')
    .then((response) => response.json())
    .then((jsonData) => {
      const roleLabel = (item) => {
        switch (item.role_id) {
          case 1:
            return 'Checkouts'
          case 2:
            return 'Supervisor'
          case 3:
            return 'Stacker'
        }
      }
      const employeeLabel = (item) => {
        for (let employee in employeesList) {
          if (employeesList[employee].id === item) {
            return `${employeesList[employee].first_name} ${employeesList[employee].last_name}`
          }
        }
      }
      // console.log('mapping data')

      const data = jsonData.map((shift)=>{

        return {
          name: `${employeeLabel(shift.employee_id)}`,
          data: [
            {
              x: roleLabel(shift),
              y: [
                new Date(shift.start_time).getTime(),
                new Date(shift.end_time).getTime()
              ]
            }
          ]
        }
      })
      setSeries(data)
    })
    .then(()=>{
      // console.log('Fetching done')
      setLoading(false)
      // console.log(data)
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    })
  }, [])

  if (loading) {
    return <>
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '265px', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    </>

  }


  const options = {
    chart: {
      type: 'rangeBar',
      toolbar: {
        show: false,
        autoSelected: 'pan'
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        rangeBarGroupRows: true,
        dataLabels: {
          hideOverflowingLabels: false
        }
      }
    },

    xaxis: {
      type: 'datetime',
      categories: ['Supervisor', 'Checkouts', 'Stacker'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        
      },
    },
    grid: {
      show: false,
    },
    yaxis: {
      labels: {
        style: {
          // colors: ['#ffffff']
        }
      },
      min: getWeekDateRange(2018, week).startDate.getTime(),
      // min: target.getTime() | new Date(shiftsData[0].start_time).getTime(),
      max: getWeekDateRange(2018, week).endDate.getTime()
    },
    colors: [
      "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
      "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
      "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
    ],
    legend: {
      show: true,
      position: 'right',
      width: 120,
      fontSize: '10px',
      labels: {
        // colors: '#ffffff',
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '8px'
      },
      x: {
        format: 'HH:mm',
      },
      y: {
        // formatter: function (val) {
        //   return val
        // },
      }
    }
  
  };

  

  return (
    <Chart className="bg-slate-300" options={options} series={series} type="rangeBar" height={250} />

  );
};

export default ShiftTable