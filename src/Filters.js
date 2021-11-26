import React from 'react';

class Filters extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"]
        const name = e.target.name;
    
        this.props.onFilter({
          [name]: value
        });
    }

    render() {
        return (
            <form>
                <input 
                    type = "text" 
                    placeholder = "Search..." 
                    name = "filterText"
                    onChange = {this.handleChange}
                    value = {this.props.filterText}/>
                <p>
                    <input 
                        type = "checkbox"
                        name = "inStockOnly"
                        onChange = {this.handleChange}
                        checked = {this.props.inStockOnly} /> 
                    &nbsp;Only show stocked products
                    
                </p>
            </form>
        );
    }
}

export default Filters;