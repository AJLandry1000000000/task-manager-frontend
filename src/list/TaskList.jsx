import React from "react";
import "../styles/TaskList.css";

const TaskList = ({ data, onTaskClick, formatDate, onNextPage, onPreviousPage, page  }) => {

    return (
        <div>
            {data.map((item, index) => (
                <div 
                key={index} 
                onClick={() => onTaskClick(item)} 
                className="listing-item"
                >
                    <p className="item-name">{item.name}</p>
                    <p>Due date: {formatDate(item.due_date)}</p>
                </div>
            ))}
            
            <hr />

            <div className="page-buttons">
                <button 
                onClick={onPreviousPage} 
                disabled={page === 1} 
                className="page-previous-button">
                    Previous
                </button>
                <button 
                onClick={onNextPage}
                >
                    Next
                </button>
            </div>
        </div>
        
    )
};

export default TaskList;