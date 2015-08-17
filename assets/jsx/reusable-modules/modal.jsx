var	React 	= require('react');

export class Modal extends React.Component{
	
	constructor(){
		$('.cross-icon, .modal-overlay').on('click', function(){
			this.closeModal();
		}.bind(this))

		if (my_globals.modal) {
			my_globals.modal.openModal = this.openModal;
			my_globals.modal.closeModal = this.closeModal;
		}
	} 

	render (){
		return (
			<div className="modal-wrapper">
				<div className="modal">
					<div className="cross-icon">
					</div>
					<div className="modal-content">
						<p>Hello, World!</p>
					</div>
				</div>
				<div className="modal-overlay"></div>
			</div>
	)}
	closeModal : function() {
		TweenMax.to('.modal', 0.2, {force3D:true, autoAlpha: 0});
		TweenMax.to('.modal-overlay', 0.2, {force3D:true, autoAlpha: 0});
		TweenMax.to('.modal', 0.4, {force3D:true, scale: 0.5, y: 150, ease: Power3.easeOut})
		TweenMax.to('.modal', 0.1, {force3D:true, scale: 1, y: 0, delay: 0.5, ease: Power3.easeOut})
	},

	openModal : function(description) {
		$('.modal .modal-content').html(description)
		TweenMax.from('.modal', 0.4, {force3D:true, delay: 0.1, scale: 0.5, y: 150, ease: Power3.easeOut})
		TweenMax.to('.modal', 0.2, {force3D:true, autoAlpha: 1, delay: 0.1});
		TweenMax.to('.modal-overlay', 0.2, {force3D:true, autoAlpha: 1, delay: 0.1});
	}

}

module.exports = Modal
