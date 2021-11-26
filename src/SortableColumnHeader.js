import React from 'react';
import './SortableColumnHeader.css';

class SortableColumnHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(e) {
        this.props.onSort(this.props.column, e.target.name);
    }

    render() {
        let currentSort = this.props.currentSort.column === this.props.column ? this.props.currentSort.direction : false;
        return(
        <th>
            {this.props.column}
            <button onClick = {this.handleSort} name = 'asc' className={currentSort === 'asc' ? 'SortableColumnHeader-current' : ''} >
                    &#x25B2;
            </button>
            <button onClick = {this.handleSort} name = 'desc' className={currentSort === 'desc' ? 'SortableColumnHeader-current' : ''} >
                    &#x25BC;
            </button>
        </th>
        );
    }
}

export default SortableColumnHeader;