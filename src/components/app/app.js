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
                {name: 'Valeriya Semenova', salary: 2500, increase: true, rise: true, id: 1},
                {name: 'Simon van Jaren', salary: 3500, increase: true, rise: false, id: 2},
                {name: 'John Dou', salary: 5500, increase: false, rise: false, id: 3},
                {name: 'Jack Heck', salary: 4000, increase: false, rise: true, id: 4},
                {name: 'Anna Torek', salary: 2700, increase: true, rise: false, id: 5},
                {name: 'Linda White', salary: 3100, increase: false, rise: true, id: 6},
            ],
            term: '',
            filter: 'all'

        }
        this.maxId = 7;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);
            
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [...before, ...after];

            return {
                // data: newArr
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
            id: this.maxId++
        }
        this.setState(({data}) => {
            
                const newArr = [...data, newItem];
                return {
                     data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
        //     const old = data[index];
        //     const newItem ={...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        //     return {
        //         data: newArr
        //     }
        // })
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return {...item}
            })
        }))
    }

    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1 
        })
        }

        onUpdateSearch = (term) => {
            this.setState({term});
        }

        filterPost = (items, filter) => {
            switch(filter) {
                case 'rise':
                    return items.filter(item => item.rise);
                case 'moreThanAverage':
                    return items.filter(item => item.salary > 3000);
                default:
                    return items
            }

        }

        onFilterSelect = (filter) => {
            this.setState({filter});
        }

        onSalaryChange = (name, salary) => {
            this.setState(({data}) => ({
              data: data.map(item => {
                if(item.name === name) {
                  return {...item, salary}
                }
                return item;
              })
            }))
          }
    
   render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
        <div className="app">
            <AppInfo employees={employees} 
                    increased={increased}/>

            <div className="search-panel">
                <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
            </div>
            <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
                onSalaryChange={this.onSalaryChange}/>
            <EmployeesAddForm onAdd={this.addItem}/>
        </div>
    );
   }
}

export default App;