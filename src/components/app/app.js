import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';


import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Alex K.', salary: 1000, increase: true, rise: true, id: 1},
                {name: 'Vitalina P.', salary: 5500, increase: false, rise: false, id: 2},
                {name: 'Ivan N.', salary: 900, increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: 'all',
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
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
            id: this.maxId++}
        
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]};
                }
                return item;
            })
        }))
    }
 
    filterPost = (items, filter) => { //items - массив

        switch (filter) {
            case 'all':
                return items;
            case 'riseStar':
                return items.filter(item => item.rise);
            case 'more1000':
                return items.filter(item => item.salary >= 1000);
            default:
                return items;
        }
    }

    searchEmp = (items, term) => {  //term - строчка, которую отображает поиск, items - массив
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    } //данный метод вернет отфильтрованный массив

    onUpdateSearch = (term) => { 
        this.setState({term}); //сокращенная запись объектов {term: term} 
    } //метод отвечает за установку состояния term

    onFilterSelect = (filter) => { 
        this.setState({filter});
    } 

    render() {
        
        const {data, term, filter} = this.state;
        const increased = data.filter(item => item.increase).length;
        const employees = data.length;
        
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                    increased={increased}
                    employees={employees}/>
    
                <div className="search-panel app-filter">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;