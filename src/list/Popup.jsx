import { useState, useEffect } from 'react'
import { createTask, updateTask } from '../api/api'
// import './styles/Popup.css' // TO DO

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
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="popup-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxWidth: '80%', maxHeight: '80%', overflow: 'auto', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {status === 'viewing' && (
                        <button 
                            onClick={onEdit} 
                            style={{ marginLeft: '10px', width: '100px', height: '40px', alignSelf: 'center'  }} 
                            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(252, 186, 3, 0.6)'} 
                            onMouseOut={(e) => e.target.style.backgroundColor = ''}>
                            Edit
                        </button>
                    )}
                    {status != 'viewing' && (
                        <button 
                            onClick={handleSave} 
                            style={{ marginLeft: '10px', width: '100px', height: '40px', alignSelf: 'center' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(73, 245, 39, 0.6)'} 
                            onMouseOut={(e) => e.target.style.backgroundColor = ''}>
                            Save
                        </button>
                    )}
                    <button 
                        onClick={onClose} 
                        style={{ marginLeft: '10px', width: '100px', height: '40px', alignSelf: 'center'  }} 
                        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(237, 69, 69, 0.6)'} 
                        onMouseOut={(e) => e.target.style.backgroundColor = ''}>
                        Close
                    </button>
                </div>
                {status === 'viewing' ? (
                    <>
                        <p style={{ fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center' }}>{data.name}</p>
                        <p>Task description: {data.description}</p>
                        <p>Task due date: {formatDate(data.due_date)}</p>
                        <p>Task creation date: {formatDate(data.created_at)}</p>
                        <div style={{ backgroundColor: urgencyStatus.color, padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                            {urgencyStatus.text}
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <label>Task name:</label>
                        <input type="text" name="name" value={taskData.name} onChange={handleChange} placeholder="Name..." style={{ width: '100%', padding: '10px', fontSize: '1em' }} />
                        <label>Task Description:</label>
                        <textarea name="description" value={taskData.description} onChange={handleChange} placeholder="Description..." style={{ width: '100%', padding: '10px', fontSize: '1em', height: '200px' }}></textarea>
                        <label>Due date:</label>
                        <input type="date" name="due_date" value={taskData.due_date ? new Date(taskData.due_date).toISOString().split('T')[0] : ''} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '1em' }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Popup