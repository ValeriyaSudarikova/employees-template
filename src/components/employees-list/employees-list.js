import './employees-list.css';

import EmployeesListItem from "../employees-list-item/employees-list-item"

const EmployeesList = ({data, onDelete, onToggleProp}) => {
    let elements = data.map(item => {
        const {id, ...itemProms} = item;
        return (
            // <EmployeesListItem name={item.name} salary={item.salary} increase={item.increase}/>
            <EmployeesListItem 
                    key = {id}  
                    {...itemProms}
                    onDelete={() => onDelete(id)}
                    onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}/>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList