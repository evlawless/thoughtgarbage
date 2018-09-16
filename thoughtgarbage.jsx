'use strict';

class ThoughtGarbage extends React.Component {
	constructor(props) {
		super(props);

		let savedState = localStorage.getItem('thoughtGarbageV1.0');
		if (savedState) {
			this.state = JSON.parse(savedState);
		} else {
			this.state = { trashedThoughts: [], currentThought: '' }
		}

		this.putThoughtInTrash = this.putThoughtInTrash.bind(this);
		this.updateCurrentThought = this.updateCurrentThought.bind(this);
	}

	putThoughtInTrash(event) {
		let thought = event.target.value;

		this.setState((state, props) => {
			let thoughts = state.trashedThoughts.slice(0);
			thoughts.push(thought);
			return { trashedThoughts: thoughts, currentThought: "" }
		});
	}

	updateCurrentThought(event) {
		let thought = event.target.value;

		this.setState({
			currentThought: thought
		});
	}

	componentDidUpdate() {
		localStorage.setItem('thoughtGarbageV1.0', JSON.stringify(this.state));
	}

	render() {
		const thoughtsInGarbage = this.state.trashedThoughts.length;
		let message = "";
		if (thoughtsInGarbage > 0) {
			message = (<div>
				<p>{thoughtsInGarbage} thought{thoughtsInGarbage > 1 ? "s are" : ' is'} currently in the garbage.</p>
			</div>);
		}

		return (
			<div className="thoughtgarbage">
				<h1>thought garbage</h1>
				<p>
					this is a very little react app for clearing&nbsp;your&nbsp;head
				</p>
				<p>
					type in a thought, then click the garbage icon to dispose of it<br />
					<sub>it'll stick around in the garbage for a little while, but things in the garbage tend to spoil</sub>
				</p>
				<p>
					now you have a little more space in your head for more positive thoughts
				</p>

				<div className="app-content thoughtgarbage-app-content px-3">
					<h3>
						make some headroom
					</h3>
					{message}
					<div className="form-group">
						<textarea placeholder="thoughts go here" className="form-control" rows="3" value={this.state.currentThought} onChange={this.updateCurrentThought}></textarea>
					</div>
					<div className="row justify-content-center">

						<button className="btn btn-secondary" onClick={this.putThoughtInTrash}>
							<span className="fas fa-trash-alt garbage-icon"></span>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
