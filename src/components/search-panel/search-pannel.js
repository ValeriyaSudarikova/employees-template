import './search-panel.css';

import { Component } from 'react';

class SearchPannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;

        this.setState({term});
        this.props.onUpdateSearch(term);
    }


    render() {
        return (
            <input type="text"
                   className='form-control search-input'
                   placeholder='найти сотрудника' 
                   value={this.state.term}
                   onChange={this.onUpdateSearch}/>
        );
    }
}

export default SearchPannel;