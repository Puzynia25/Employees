import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            termSearch: ''
        }
    }
    
    onUpdateS = (e) => {
        const termSearch = e.target.value;
        this.setState({termSearch});
        this.props.onUpdateSearch(termSearch);
    }

    render() {

        return(
            <input 
                type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника"
                onChange={this.onUpdateS}/>
        )
    }
}

export default SearchPanel;