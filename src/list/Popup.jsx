import React from 'react'

const Popup = ({ data, onClose, formatDate }) => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxWidth: '80%', maxHeight: '80%', overflow: 'auto', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={onClose} 
                        style={{ marginLeft: '10px', width: '80px', height: '30px' }} 
                        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(252, 186, 3, 0.6)'} 
                        onMouseOut={(e) => e.target.style.backgroundColor = ''}>
                        Edit
                    </button>
                    <button 
                        onClick={onClose} 
                        style={{ marginLeft: '10px', width: '80px', height: '30px' }} 
                        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(237, 69, 69, 0.6)'} 
                        onMouseOut={(e) => e.target.style.backgroundColor = ''}>
                        Close
                    </button>
                </div>
                <p style={{ fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center' }}>{data.name}</p>
                <p>{data.description}</p>
                <p>Due date: {formatDate(data.due_date)}</p>
                <p>Task creation date: {formatDate(data.created_at)}</p>
            </div>
        </div>
    )
}

export default Popup