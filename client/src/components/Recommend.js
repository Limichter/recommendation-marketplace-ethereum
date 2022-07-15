import React, { Component } from 'react'
import { topn } from "./cfrating.js";
import { barang } from "./databarang.js";
import { Link } from 'react-router-dom';

var ratings = new Array();
var top;
var ravalue;

export class Recommend extends Component {
	render() {
		return (
            
			<div className="col-md-12">
               {this.props.products && this.props.products.length > 0
					&& this.props.products
					.sort((a,b) => { return b.id - a.id })
					.map((product, key) => {
                        ratings= []
					})}
                { this.props.products && this.props.products.length > 0
					&& this.props.products
					.sort((a,b) => { return b.id - a.id })
					.map((product, key) => {
                        ratings.push([(product.name), (product.owner), (parseFloat(window.web3.utils.fromWei(product.price.toString(), 'Ether')))])
					})
				} 
                {this.props.products.filter(p => p.owner === this.props.account).length > 0&& 
				this.props.products && this.props.products.length > 0
					&& this.props.products
					.sort((a,b) => { return b.id - a.id })
					.map((product, key) => {
                        top = topn(ratings, barang, this.props.account);
						console.log(top)
					})
				} 
				<h2>Top 5 Rekomendasi</h2>
				<hr/>
				{ this.props.products.filter(p => p.owner === this.props.account).length > 0
					?
					
				<div className="row">
				{ 
					top
					.map((top, key) => {
						ravalue=0;
						if(key<5)
							return(
								<div key={key} className="col-sm-4 mb-3">
									<div className="card" style={{minHeight: '220px'}}>
										<div className="card-body">
											<div className="d-flex justify-content-between align-items-center mb-2">
												<span style={{fontSize: '18pt'}}>{top[0]}</span>
												<div className="d-flex flex-column">
												<small></small>
												<span className="font-weight-bold" style={{fontSize: '13pt'}}></span>
											</div>
											</div>
											<hr />
											{	this.props.products.sort((a,b) => { return b.id - a.id })
												.filter(p => p.owner === this.props.account)
												.filter(b => b.name === top[0])
												.map((product, keys) => {
												ravalue = top[2]
												}
												)
											}
												<h6>{'Recommendation Score :'} <br></br> {top[2]}</h6><br/>
										</div>
										<div className="card-footer" style={{background: 'transparent', borderTop: '0px'}}>
										</div>
									</div>
								</div>
							)
					})
				}
				</div>
				: <div>Belum ada rating, minimal memberikan 2 rating. <Link to="/rating"><button className="btn btn-info float-right font-weight-bold" style={{minWidth: '100px'}}>Rating</button></Link></div>
				}
			</div>
		)
	}
}

export default Recommend
