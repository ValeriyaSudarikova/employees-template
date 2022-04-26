import { Component } from 'react';
import nextId  from 'react-id-generator';

import './app.css';

// import '../app-info/app-info';
import AppInfo from '../app-info/app-info';
import AppFilter from '../app-filter/app-filter';
import SearchPannel from '../search-panel/search-pannel';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John Smith', salary: 1000, increase: false, id: 1},
                {name: 'Hanna Useth', salary: 900, increase: true, id: 2},
                {name: 'Amina Jacobs', salary: 1100, increase: false, id: 3}
            ], 
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);
            //       before = data.slice(0, index),
            //       after = data.slice(index + 1);
            // const newArr = [...before, ...after];

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: nextId()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    onSearchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term) > -1; 
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }
    
    SearchFilter = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    } 

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} =this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.SearchFilter(this.onSearchEmp(data, term), filter);
    
        return (
            <div className="app">
                <AppInfo employees={employees}
                         increased={increased}/>
    
                <div className="search-panel">
                    <SearchPannel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter onFilterSelect = {this.onFilterSelect}
                               filter={filter}/>
                    <EmployeesList data={visibleData}
                                   onDelete={this.deleteItem}
                                   onToggleProp={this.onToggleProp}/>
                </div>
    
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
    
}

export default App;