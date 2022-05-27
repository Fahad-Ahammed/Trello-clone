import React from 'react'
import './ChecklistCreate.css'
export default function ChecklistCreate({addnewChecklistHandle,addnewchecklistTitle,postNewChecklist}) {
    return (
        <div className='checklist-create'>
            <input onChange={addnewchecklistTitle} type="text" placeholder='Add title' className='checklist-input'/>
            <button onClick={postNewChecklist} className='checklist-add-btn'>Add</button>
            <button onClick={addnewChecklistHandle} className='checklist-cancel-btn'>Cancel</button>
        </div>
    )
}
