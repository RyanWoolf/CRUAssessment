import { useState } from 'react'
import './App.css'
import IconButton from '@mui/material/IconButton'
import NavigateNext from '@mui/icons-material/NavigateNext'
import NavigateBefore from '@mui/icons-material/NavigateBefore'
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ShiftTable from './components/ShiftTable'

function App() {
  const [week, setWeek] = useState(25)
  const [alignment, setAlignment] = useState('week');
  const [staff, setStaff] = useState('')

  const staffList = []

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


  return (
    <>
      <article className="w-[80%] h-full m-auto pt-24 drop-shadow-2xl">

        {/* Header */}
        <section className="bg-slate-700 text-white flex justify-between items-center px-20 py-5 rounded-t-xl">
          {/* Week navigator */}
          <div className="w-[187px]">
            <h2 className="font-semibold text-3xl text-center">2018</h2>
            <div>
              <div className="flex justify-center items-center">
                <IconButton aria-label="next" size="medium" color="primary">
                  <NavigateBefore fontSize="inherit"></NavigateBefore>
                </IconButton>
                  <p className="text-sm">{alignment === 'week' ? `Week ${week}` : '18 July - 25 July'}</p>
                <IconButton aria-label="previous" size="medium" color="primary">
                  <NavigateNext fontSize="inherit"></NavigateNext>
                </IconButton>
              </div>
            </div>
          </div>

          {/* Search or Select staff id */}
          <div>
            <Button
              sx={{ width: '72px' }}
              size="small" 
              color='primary'
              onClick={()=>alignment === 'week' ? setAlignment('day') : setAlignment('week')} 
              variant={'contained'}>
            
            {alignment === 'week' ? 'week' : 'day'}
              
            </Button>
          </div>
        </section>

        {/* Shift Table */}
        <section className="px-10 py-5 bg-slate-300 rounded-b-xl">
          <ShiftTable></ShiftTable>
        </section>

      </article>
    </>
  )
}

export default App
