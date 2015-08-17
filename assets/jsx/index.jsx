 
var React 				= require('react/addons'),
	Home 				= require('./pages/home.jsx'),
	Footer 				= require('./components/global/footer.jsx'),
	Menu 				= require('./components/global/menu.jsx'),
	TransitionGroup 	= React.addons.CSSTransitionGroup;

import { 
	Router,
	Route,
	Link,
	RouteHandler,
	NotFoundRoute,
	DefaultRoute,
	Redirect,
	HistoryLocation, 
	run
} from 'react-router';

export class App extends React.Component {
	static contextTypes = {
		router: React.PropTypes.func.isRequired
	}

	render(props) {
		var name = this.context.router.getCurrentPath().split('/')[1];
		return (
			<div id="react-wrapper">
				<Menu id="menu"/>
				<TransitionGroup transitionName="page-transition" className="page-transition-wrapper" component="div">
					<RouteHandler key={name}/>
				</TransitionGroup>
				<Footer id="footer"/>
			</div>
		);
	}
}

var routes = (
	<Route name="index" handler={App} path="/" ignoreScrollBehavior>
		<DefaultRoute handler={Home}/>
	</Route>
)

run(routes, HistoryLocation, function(Root) {
	React.render(<Root/>, document.getElementById('react-app'));
});