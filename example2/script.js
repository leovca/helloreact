var ProductCategoryRow = React.createClass({
  render: function () {
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    )
  }
});

var ProductRow = React.createClass({
  render: function () {
    var name = this.props.product.stocked ?
    this.props.product.name :
    (
      <span style={{color: 'red'}}>{this.props.product.name}</span>
    )

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function () {
    var rows = [];
    var lastCategory = null;

    this.props.products.forEach(function (product) {
      //apply filter
      if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)){
        return;
      }

      if(product.category != lastCategory){
        rows.push(<ProductCategoryRow product={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name}/>);
      lastCategory = product.category;
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
});

var SearchBar = React.createClass({
  handleChange: function () {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    )
  },
  render: function () {
    return (
      <form>
        <input type="text" placeholder="Search..." onChange={this.handleChange} ref="filterTextInput" value={this.props.filterText}/>
        <p>
          <input type="checkbox"  onChange={this.handleChange} ref="inStockOnlyInput" checked={this.props.inStockOnly}/>
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
})

var FilterableProductTable = React.createClass({
  getInitialState: function () {
    return {
      filterText: '',
      inStockOnly: false
    }
  },
  handleUserInput: function (filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },
  render: function() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput} />
        <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
});

var productsSource = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={productsSource} />,
  document.getElementById('content')
);
