import React, { Component } from 'react'

export class List extends Component {
	render() {
		return (
			<div className="col-md-12">
				<div className="col-md-4">
					<h1>List Rating</h1>
				</div>
				<hr className="my-4"/>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Price</th>
						</tr>
					</thead>
					<tbody>
						{this.props.products.filter(p => p.owner === this.props.account).length > 0
							? this.props.products
								.filter(p => p.owner === this.props.account)
								.map((product, key) => {
								console.log(product)
								return (
									<tr key={key}>
										<th scope="row">{key+1}</th>
										<td>{product.name}</td>
										<td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Star</td>
									</tr>
								)
								})
							: <tr><td colSpan="3" className="text-center">You not have any rating yet.</td></tr>
						}
					</tbody>
				</table>
			</div>
		)
	}
}

export default List
