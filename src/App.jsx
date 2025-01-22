import { useState, useEffect } from 'react'
import axios from 'axios'
import { getAllTasks } from './api/api'
import CheckboxLogo from './logo/CheckboxLogo'
import TaskList from './list/TaskList'
import Popup from './list/Popup'
import './App.css'

function App() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  
  useEffect(() => {
    getAllTasks(page).then((data) => {
      setData(data.data)
    }).catch(error => {
      console.error("Error fetching data:", error)
    })

      console.log(data)
  }, [])

  const handleTaskClick = (item) => {
    setSelectedData(item)
  }

  const handleCloseTaskClick = () => {
    setSelectedData(null)
  }

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const dateDay = dateObject.getDate().toString().padStart(2, '0');
    const dateMonth = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const dateYear = dateObject.getFullYear();
    const dateHours = dateObject.getHours().toString().padStart(2, '0');
    const dateMinutes = dateObject.getMinutes().toString().padStart(2, '0');
    return `${dateMinutes}:${dateHours}   ${dateDay}-${dateMonth}-${dateYear}`;
  }

  return (
    <>
      <header style={{ display: 'flex', alignItems: 'center' }}>
        <CheckboxLogo />
        <h1           
          onMouseOver={(e) => e.target.style.color = 'rgba(4, 176, 4, 0.5)'} 
          onMouseOut={(e) => e.target.style.color = ''}>
          Checkbox.ai Task Management
          </h1>
      </header>

      <hr />

      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button 
          onClick={() => setData({})}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(73, 245, 39, 0.4)'} 
          onMouseOut={(e) => e.target.style.backgroundColor = ''}>
          Create Task
        </button>
        <button 
          onClick={() => setData({})}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(31, 62, 237, 0.4)'} 
          onMouseOut={(e) => e.target.style.backgroundColor = ''}>
          Filter Tasks
        </button>
      </div>
    
      {/* {data && <p>Data from server: {JSON.stringify(data)}</p>} */}

      {data && <TaskList data={data} onTaskClick={handleTaskClick} formatDate={formatDate} />}
      
      {selectedData && <Popup data={selectedData} onClose={handleCloseTaskClick} formatDate={formatDate} />}

    </>
  )
}

export default App
