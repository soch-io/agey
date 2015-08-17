var	React 	= require('react')

export class Svg_up extends React.Component{
	state={svg_state : "" }

	constructor(props){
		super(props)
		
		var path = '/img/'
		if (this.props.root)
			path += this.props.root
		path += this.props.svg+'.svg'
		$.get(path , function (data){
			this.setState({svg_state: data});
			if (this.props.onSvgLoad)
				this.props.onSvgLoad();
		}.bind(this), 'text')

	} 

	render(props) {
		var classString = 'svg-wrap '+ this.props.className
		return (
			<div className={classString} dangerouslySetInnerHTML={{__html:this.state.svg_state}}>
			</div>
				)
		}

}

module.exports = Svg_up