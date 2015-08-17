var React  = require('react/addons')
	
class Home extends React.Component{
	constructor() {
		super()
		document.title = "Agey"
	}

	render() {
		return (
			<div>
				<h1>  Hello, World!  </h1>
				<h2>  Hello, World! </h2>
				<h3>  Hello, World! </h3>
				<h4>  Hello, World! </h4>
			</div>
		)
	}
};

module.exports = Home
