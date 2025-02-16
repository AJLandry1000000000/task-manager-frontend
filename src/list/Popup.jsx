import { useState, useEffect } from 'react'
import { createTask, updateTask } from '../api/api'
import '../styles/Popup.css'

const Popup = ({ data, onClose, formatDate, status, onSave, onEdit }) => {
    const [taskData, setTaskData] = useState(data || { name: '', description: '', due_date: '' })
    
    useEffect(() => {
        setTaskData(data || { name: '', description: '', due_date: '' })
    }, [data])

    const handleChange = (e) => {
        const { name, value } = e.target
        setTaskData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSave = async () => {
        if (!taskData.name || !taskData.description || !taskData.due_date) {
            alert("All fields are required. None of them can be empty!")
            return
        }

        if (status === 'editing') {
            await updateTask(taskData)
        } else if (status === 'creating') {
            await createTask(taskData)
        }
        onSave()
    }

    const getUrgencyStatus = () => {
        const dueDate = new Date(taskData.due_date)
        const today = new Date()

        // Calculate the difference in time (milliseconds)
        const diffTime = dueDate - today

        // Calculate the difference in time (milliseconds)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays < 0) {
            return { text: "Overdue", color: "lightcoral" }
        } else if (diffDays <= 7) {
            return { text: "Due soon", color: "lightgreen" }
        } else {
            return { text: "Not urgent", color: "lightgrey" }
        }
    }
    
    const urgencyStatus = getUrgencyStatus()

    return (
        <div className="popup-div">
            <div className="popup-container">
                <div className='top-buttons-div'>
                    {status === 'viewing' && (
                        <button 
                            onClick={onEdit} 
                            className='top-buttons edit' >
                            Edit
                        </button>
                    )}
                    {status != 'viewing' && (
                        <button 
                            onClick={handleSave} 
                            className='top-buttons save' >
                            Save
                        </button>
                    )}
                    <button 
                        onClick={onClose} 
                        className='top-buttons close' >
                        Close
                    </button>
                </div>
                {status === 'viewing' ? (
                    <>
                        <p className='viewing-task-name'>{data.name}</p>
                        <p>Task description: {data.description}</p>
                        <p>Task due date: {formatDate(data.due_date)}</p>
                        <p>Task creation date: {formatDate(data.created_at)}</p>
                        <div 
                        className='viewing-task-status'
                        style={{ backgroundColor: urgencyStatus.color }}>
                            {urgencyStatus.text}
                        </div>
                    </>
                ) : (
                    <div className='input-fields'>
                        <label>Task name:</label>
                        <input type="text" name="name" value={taskData.name} onChange={handleChange} placeholder="Name..." />
                        <label>Task Description:</label>
                        <textarea className='input-description' name="description" value={taskData.description} onChange={handleChange} placeholder="Description..." ></textarea>
                        <label>Due date:</label>
                        <input type="date" name="due_date" value={taskData.due_date ? new Date(taskData.due_date).toISOString().split('T')[0] : ''} onChange={handleChange} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Popup