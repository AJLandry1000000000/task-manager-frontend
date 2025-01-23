import { useState, useEffect } from 'react'
import { getAllTasks } from './api/api'
import CheckboxLogo from './logo/CheckboxLogo'
import TaskList from './list/TaskList'
import Popup from './list/Popup'
import './styles/App.css'

function App() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const [popupStatus, setPopupStatus] = useState('viewing')
  
  useEffect(() => {
    getAllTasks(page).then((data) => {
      setData(data.data)
    }).catch(error => {
      console.error("Error fetching data:", error)
    })

  }, [page])

  const handleTaskClick = (item) => {
    setSelectedData(item)
  }

  const handleCloseTaskClick = () => {
    setSelectedData(null)
    setPopupStatus('viewing')
  }

  const handleSave = () => {
    setSelectedData(null)
    setPopupStatus('viewing')
    getAllTasks(page).then((data) => {
      setData(data.data)
    }).catch(error => {
      console.error("Error fetching data:", error)
    })
  }

  const handleEditTaskClick = () => {
    setPopupStatus('editing')
  }

  const handleCreateTaskClick = () => {
    setSelectedData({ name: '', description: '', due_date: '' })
    setPopupStatus('creating')
  }

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1))
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
      <header>
        <CheckboxLogo />
        <h1           
          onMouseOver={(e) => e.target.style.color = 'rgba(4, 176, 4, 0.5)'} 
          onMouseOut={(e) => e.target.style.color = ''}>
          Checkbox.ai Task Management
          </h1>
      </header>

      <hr />

      {/* {data && <p>Data from server: {JSON.stringify(data)}</p>} */}

      <div>
        <button 
          onClick={handleCreateTaskClick}
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
    
      {data && <TaskList data={data} onTaskClick={handleTaskClick} formatDate={formatDate} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} page={page} />}
      
      {selectedData && <Popup data={selectedData} onClose={handleCloseTaskClick} formatDate={formatDate} status={popupStatus} onSave={handleSave} onEdit={handleEditTaskClick} />}

    </>
  )
}

export default App
