import React, { Component } from 'react'
import ReactStars from "react-rating-stars-component";
import { barang } from './databarang'

var ravalue;

export class Rating extends Component {
	render() {
		return (
			<div className="col-md-12">
				<h2>Rating Product</h2>
				<hr/>
				<div className="row">
				{ 
					barang.sort((a,b) => { return b.id - a.id })
					.map((barang, key) => {
						console.log(barang)
						ravalue=0;
						return(
							<div key={key} className="col-sm-4 mb-3">
								<div className="card" style={{minHeight: '220px'}}>
									<div className="card-body">
										<div className="d-flex justify-content-between align-items-center mb-2">
											<span style={{fontSize: '18pt'}}>{barang[1]}</span>
										</div>
										<hr />
									</div>
									<div className="card-footer" style={{background: 'transparent', borderTop: '0px'}}>
										{	this.props.products.sort((a,b) => { return b.id - a.id })
											.filter(p => p.owner === this.props.account)
											.filter(b => b.name === barang[1])
											.map((product, keys) => {
											ravalue = window.web3.utils.fromWei(product.price.toString(), 'Ether');
											}
											)
										}
												<ReactStars
												count={5} 
												size={50}
												isHalf={true}
												activeColor="#ffd700"
												value = { ravalue }
												onChange={rvalue => {
													const name = barang[1]
													const price = window.web3.utils.toWei(rvalue.toString(), 'Ether')
													this.props.createProduct(name, price)
												}}
												/>
									</div>
								</div>
							</div>
						)
					})
				}
				</div>
			</div>
		)
	}
}

export default Rating
