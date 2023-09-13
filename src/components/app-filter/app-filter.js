
import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'riseStar', label: 'На повышение'},
        {name: 'more1000', label: 'З/П больше 1000$'}
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const classNames = active? 'btn-light' : 'btn-outline-light';

        return (
            <button 
                className={`btn ${classNames}`}
                type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}>
                    {label}
            </button> 
        )
    })

   
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
}

export default AppFilter;