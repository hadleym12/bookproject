import React from 'react';
import ProductRow from './ProductRow.js';
//import ProductTableHeader from './ProductTableHeader.js';
import SortableColumnHeader from './SortableColumnHeader.js';

class ProductTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sort: {
                column: 'name',
                direction: 'desc'
            }
        };

        this.sortByKeyAndOrder = this.sortByKeyAndOrder.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleEdit = this.handleEdit.bind(this);


    }

    sortByKeyAndOrder(objectA, objectB) {
        let isDesc = this.state.sort.direction === 'desc' ? 1 : -1;
        let [a, b] = [objectA[this.state.sort.column], objectB[this.state.sort.column]];
        if (this.state.sort.column === 'price') {
          [a, b] = [a, b].map((value) => parseFloat(value.replace(/[^\d\.]/g, ''), 10));
        }
        if (a > b) {
          return 1 * isDesc;
        }
        if (a < b) {
          return -1 * isDesc;
        }
        return 0;
    }

    handleDestroy(id) {
        this.props.onDestroy(id);
    }
      
    handleSort(column, direction) {
        this.setState({
            sort: {
                column: column,
                direction: direction
            }
        });
    }

    handleEdit(id) {
        this.props.editProduct(id);
    }

    sortProducts() {
        let productsAsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid]);
        return productsAsArray.sort(this.sortByKeyAndOrder);
    }

    render() {
        var rows = [];
        this.sortProducts().forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            rows.push(<ProductRow product={product} key={product.id} onDestroy={this.handleDestroy} onEdit={this.handleEdit}/>);
        });
    
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                        <SortableColumnHeader
                            currentSort={this.state.sort}
                            onSort = {this.handleSort}
                            column="name" />
                        <SortableColumnHeader
                            currentSort={this.state.sort}
                            onSort = {this.handleSort}
                            column="price" />
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}

export default ProductTable;