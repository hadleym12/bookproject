import React from 'react';
import './ProductForm.css'

const RESET_VALUES = {id: '', category: '', price: '', stocked: false, name: ''};

class ProductForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            product: Object.assign({}, RESET_VALUES),
            //errors: {},
            errorMessage: ''
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    verifySave() {
        if(this.state.product.name === '') {
            this.setState({
                errorMessage: 'Please Provide Name'
            });
            return false;
        } else {
            return true;
        }
    }

    handleSave(e) {
        if(this.verifySave()){
            
            if(this.props.populateFormId === '' ){
                this.props.onSave(this.state.product);
            } else {
                this.props.saveEdit(this.state.product);
            }

            // reset the form values to blank after submitting:
            this.setState({
                product: Object.assign({}, RESET_VALUES)
            });
        }
        // prevent the form submit event from triggering an HTTP Post:
        e.preventDefault();
    }
    
    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState((prevState) => {
          prevState.product[name] = value;
          if(name === "name" && name !== '' ) {
              return {
                  product: prevState.product, 
                  errorMessage: ''
              }
          } else {
              return { product: prevState.product };
          }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.populateFormId !== prevProps.populateFormId) {
            let id = this.props.populateFormId;
            if ( id === '' ) {
                this.setState({
                    product: Object.assign({}, RESET_VALUES)
                });
            } else {
                this.setState({
                    product: this.props.products[id]
                });
            }
        }
    }

    render() {
        return (
            <form>
                <h3>Enter a new product</h3>
                <p className="ProductFormError"> {this.state.errorMessage} </p>
                <p>
                    <label>
                        Name
                        <br />
                        <input 
                            type = "text" 
                            name = "name" 
                            onChange = {this.handleChange} 
                            value = {this.state.product.name} />
                    </label>
                </p>
                <p>
                    <label>
                        Category
                        <br />
                        <input 
                            type = "text" 
                            name = "category" 
                            onChange = {this.handleChange} 
                            value = {this.state.product.category}/>
                    </label>
                </p>
                <p>
                    <label>
                        Price
                        <br />
                        <input 
                            type = "text" 
                            name = "price" 
                            onChange = {this.handleChange} 
                            value = {this.state.product.price}/>
                    </label>
                </p>
                <p>
                    <label>
                        <input 
                            type = "checkbox" 
                            name = "stocked" 
                            onChange = {this.handleChange} 
                            checked = {this.state.product.stocked} />
                                &nbsp;In stock?
                    </label>
                </p>
                <input 
                    type = "submit" 
                    value = "Save" 
                    onClick = {this.handleSave}/>
            </form>
        );
    }
}

export default ProductForm;