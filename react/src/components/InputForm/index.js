import React, { Component } from 'react';
import axios from 'axios';
import './style.css';
import Tag from '../Tag/index.js'

export default class InputForm extends Component {
	constructor() {
		super();
		this.state = {
			tags: []
		}
	}
	render() {
		return (
			<div id={'start'}>
				<div className="center input-component">
					<br/><br/>
					<h1 className="ui header input-header">Experience all your desires</h1>
					<form>
						<div className="ui right labeled input moneyInput">
							<label htmlFor="amount" className="ui label">$</label>
							<input className="" type="text" name="money" ref="money" placeholder="how rich are you?" />
						</div>
						<div className="tagInput ui right labeled left icon input">
							<i className="tags icon"></i>
							<input id="tag-input" type="text" name="tags" ref="tags" placeholder="enter tags"/>
							<a className="ui tag label" onClick={this.addTag.bind(this)} value="add tag">add tag</a>
						</div>
						<div>
							<input type="number" ref="visitorCount" placeholder="number of visitors"/>
						</div>
						<div>
							<input type="number" ref="nightsCount" placeholder="how many nights you can spent?"/>
						</div>
					</form>
					<div>
						{this.state.tags.map( (tag, i) => {
							return <Tag key={i} name={tag} deleteTag={this.deleteTag.bind(this, i)} />
						})}
					</div>
					<br/>
					<input className="ui button" type="submit" onClick={this.sendRequest.bind(this)} value="Submit" />
					<br/><br/><br/>
				</div>

			</div>
		)
	}

	deleteTag(i) {
		this.state.tags.splice(i, 1);
		this.setState({tags: this.state.tags});
	}

	addTag() {
		if (this.refs.tags.value !== '' && this.state.tags.indexOf(this.refs.tags.value) === -1)  {
			this.setState({tags: this.state.tags.concat([this.refs.tags.value])})
			document.getElementById('tag-input').value = '';
		}
	}

	sendRequest() {
		axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/api/v0/',
			data: {
				money: this.refs.money.value / this.refs.visitorCount.value / this.refs.nightsCount.value,
				tags: this.state.tags,
				visitorCount: this.refs.visitorCount.value,
				nightsCount: this.refs.nightsCount.value
			}
		})
		.then(res => {
			this.props.tripsLoaded(res);
		})
	}
}