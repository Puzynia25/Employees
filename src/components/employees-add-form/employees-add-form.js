import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            salary: '',
            validName: true,
            validSalary: true,
        }
    }

    onValueChange = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        
        this.setState({
            [nameInput]: valueInput,
        }, () => {
            this.setState({
                validName: this.validateField(this.state.name),
                validSalary: this.validateField(this.state.salary)
                
            })
        })
    }

    validateField = (valueField) => {
        return valueField.length >= 3;
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const {onAdd} = this.props;
        const {name, salary} = this.state;

        if (this.validateField(name)) {
            onAdd(name, salary);
            this.setState ({
                name: '',
                salary: '',
                validName: true,
                validSalary: true
            }); 
        } else {
            e.preventDefault();
            this.setState ({
                validName: false,
                validSalary: false,
            });
        }
    }

    render() {
        const {name, salary} = this.state;
        const errorName = this.state.validName ? '' : 'active'
        const errorSalary = this.state.validSalary ? '' : 'active'
        const classesName = `error ${errorName}`
        const classesSalary = `error ${errorSalary}`

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form 
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        value={name}
                        onChange={this.onValueChange}
                        />
                        
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}
                        />
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
                <span className={classesName}>Пожалуйста, введите имя сотрудника</span>
                <span className={classesSalary}>Пожалуйста, введите заработную плату</span>
            </div>
        )
    }
   
}

export default EmployeesAddForm;