
var React =  require('react/addons')
var Footer = React.createClass({
	render	: function() {
		return (
			<div id={this.props.id}>
			</div>
		)
	},

	backToTop : function() {
		TweenMax.to(window, 1, {scrollTo:{y:0}, ease:Power2.easeOut});
	}
})

module.exports = Footer
