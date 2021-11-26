import React from 'react';
import './ProductRow.css';

class ProductRow extends React.Component {
    constructor(props) {
        super(props);
        this.destroy = this.destroy.bind(this);
        this.edit = this.edit.bind(this);
    }

    destroy() {
        this.props.onDestroy(this.props.product.id);
    }

    edit() {
        this.props.onEdit(this.props.product.id);
    }

    render() {
        return (
            <tr>
                <td>
                    <span className={this.props.product.stocked ? '' : 'ProductRow-out-of-stock'}>
                        {this.props.product.name}
                    </span>
                </td>
                <td>
                    {this.props.product.price}
                </td>
                <td>
                    <button onClick={this.destroy} style={{color: '#de4949'}}>x</button>
                </td>
                <td>
                    <button onClick={this.edit}> edit </button>
                </td>
            </tr>
        );
    }
}

export default ProductRow;