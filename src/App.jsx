import { useState } from 'react'
import './App.css'
import IconButton from '@mui/material/IconButton'
import NavigateNext from '@mui/icons-material/NavigateNext'
import NavigateBefore from '@mui/icons-material/NavigateBefore'
import Button from '@mui/material/Button';
import ShiftTable from './components/ShiftTable'

function App() {
  const [week, setWeek] = useState(25)
  const [day, setDay] = useState(new Date(new Date('2018 19 Jun').setUTCHours(0,0,0,0)).getTime())
  const [alignment, setAlignment] = useState('week');
  const [staff, setStaff] = useState('')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ]
  const staffList = []

  // console.log(new Date('18 July').getDate())
  // console.log(new Date(((new Date('18 July').getTime())-3600)).getDate())

  const handleAddDay = () => {
    const nextDay = new Date(day + 86400000).setUTCHours(0, 0, 0, 0)
    setDay(nextDay)
  }
  const handleMinusDay = () => {
    const previousDay = new Date(day - 86400000).setUTCHours(0, 0, 0, 0)
    setDay(previousDay)
  }

  const handleAddWeek = () => {
    setWeek(week + 1)
  }
  const handleMinusWeek = () => {
    setWeek(week - 1)
  }


  return (
    <>
      <article className="w-[80%] drop-shadow-2xl">

        {/* Header */}
        <section className="bg-slate-700 text-white flex justify-between items-center px-20 py-5 rounded-t-xl">
          {/* Week navigator */}
          <div className="w-[187px]">
            <h2 className="font-semibold text-3xl text-center">2018</h2>
            <div>
              <div className="flex justify-center items-center">
                <IconButton aria-label="next" size="medium" color="primary" value='1' onClick={alignment === 'week' ? handleMinusWeek : handleMinusDay}>
                  <NavigateBefore fontSize="inherit"></NavigateBefore>
                </IconButton>
                  <p className="text-sm w-[57px] text-center">{alignment === 'week' ? `Week ${week}` : `${new Date(day).getDate()} ${months[new Date(day).getMonth()]}`}</p>
                <IconButton aria-label="previous" size="medium" color="primary" value='1' onClick={alignment === 'week' ? handleAddWeek : handleAddDay}>
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
          <ShiftTable week={week} day={day} alignment={alignment}></ShiftTable>
        </section>

      </article>
    </>
  )
}

export default App
