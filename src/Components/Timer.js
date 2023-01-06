import React, { useState } from 'react'
import './Timer.css'
import Dialog from '@material-ui/core/Dialog'
import DiaLogTitle from '@material-ui/core/DialogTitle'
import DiaLogContentText from '@material-ui/core/DialogContentText'
import DiaLogContent from '@material-ui/core/DialogContent'
import { Button } from '@material-ui/core'

function Timer() {

  //const element = <FontAwesomeIcon icon={faClock} />



  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  // const [isPaused, setIsPaused] = useState(false)
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState()
  const [desc, setdesc] = useState()
  const [list, setList] = useState([]);
  const [saveTime, setSaveTime] = useState('')
  const [increment, setIncrement] = useState('')

  const increaseCount = () =>{
    let temp = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
    setIncrement(temp);
    // console.log(increment)

  }

  const handleStart = () => {
    setIsActive(true)
    increaseCount();
  }

  const handlePause = () => {
    setIsActive(false)
    clearInterval(increment)
  
  }


  const handelClose = () => {
    setTitle('');
    setSaveTime('');
    setdesc('');
    setOpen(false);
    increaseCount();
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} : ${getSeconds}`

  }
  const handleSave = () => {
    setOpen(true)
    //SetSave(timer)
    handlePause();
     let getTime = formatTime();
     setSaveTime(getTime)
    // setTimer(timer) 
    // console.log('open')
  }

  function savedata() {
    setList((list) => {
      const updatedList = [...list, {time : saveTime , Title : title , Desc : desc }]
      // console.log(updatedList)

      return updatedList;
    })

    handelClose();
  }
  function removeActivity(i) {
    const updatedListData = list.filter((element, id) => {
      return i !== id;
    })
    setList(updatedListData);
  }

  return (
    <>
      <div className="theader">
        <h2> Stopwatch</h2>
        <div className='stopwatch-card'>
          <p>{formatTime()}</p>
          <div className=''>

            <button disabled={isActive} onClick={handleStart} className='btn-primary1'  >Start</button>
            <button disabled={!isActive} onClick={handlePause} className='btn-primary2'>Pause</button>
            <button onClick={handleSave} className='btn-primary3'>Save</button>
            <div className='box'>
              <Dialog open={open} onClose={handelClose} >
                <h4 className='timed'>  Time Duretion {saveTime}</h4>
                <DiaLogTitle className='title'>
                  Tittle
                  <input onChange={(e) => setTitle(e.target.value)} className='inpt' value={title} />
                </DiaLogTitle>
                <DiaLogContent>
                  <DiaLogContentText style={{ color: 'white' }}>
                    Description
                    <input onChange={(e) => setdesc(e.target.value)} className='inpd'  value={desc} />
                  </DiaLogContentText>
                </DiaLogContent>
                <button className='btn-primary' onClick={savedata}>save</button>
                <button className='btn-primary' onClick={handelClose}>cancel</button>
              
              </Dialog>
            </div>
          </div>
        </div>
        <div className='maplist'>
                  {list.map !== [] && list.map((item, i) => {
                    return (
                      <ul key={i}>
                        <div className='row'>
                        <li> No {i} ,  Time {item.time} , Title { item.Title}  ,  Description  { item.Desc}</li>
                        <button className='rbtn' onClick={() => removeActivity(i)}>Remove</button>
                        </div>
                      </ul>
                    )
                  }
                  )}
        </div>
      </div>
    </>
  )
}

export default Timer;


