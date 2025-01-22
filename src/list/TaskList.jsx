import React from "react";

const TaskList = ({ data, onTaskClick, formatDate, onNextPage, onPreviousPage, page  }) => {

    return (
        <div>
            {data.map((item, index) => (
                <div key={index} onClick={() => onTaskClick(item)} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', padding: '2px 5px', margin: '5px', cursor: 'pointer' }}>
                    <p style={{ fontWeight: 'bold' }}>{item.name}</p>
                    <p>Due date: {formatDate(item.due_date)}</p>
                </div>
            ))}
            
            <hr />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={onPreviousPage} disabled={page === 1} style={{ marginRight: '10px' }}>Previous</button>
                <button onClick={onNextPage}>Next</button>
            </div>
        </div>
        
    )
};

export default TaskList;