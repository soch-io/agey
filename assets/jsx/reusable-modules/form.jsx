var	React 	= require('react');

export class Name extends React.Component{

	render (){
		return (
	 	 	<div className= "form-name form-component-wrapper">
	 	 		<label>NAME</label>
	 			<input id="name" type ="text" name={this.props.name} placeholder ={this.props.children}></input>
	 			<div className ="error-msg">name please!</div>
	 		</div>
		)
	}
	constructor(){
		$('#name').on('blur' , function(){
			
			var valid 		= $(this).val().length >2
			var error_msg 	= $(this).siblings('.error-msg')

			if (valid) {
				$(this).css("borderColor" , "#27ae60")
				$(error_msg).removeClass("invalid");
				$(this).attr("data-validity" , true);
			}
			else {
				$(this).css("borderColor" , "#e74c3c")
				$(error_msg).addClass("invalid");
				$(this).attr("data-validity" , false);
			}

		})

		$('#name').on('focus' , function(){
			$(this).css("borderColor" , "#f39c12")
		})
	}

}

class Email extends React.Component{ 

	render(props){
	 	 return (
	 	 	<div className= "form-email form-component-wrapper">
	 	 		<label>EMAIL</label>
	 			<input id="email" type ="email" name={this.props.name} placeholder ={this.props.children}></input>
	 			<div className ="error-msg">invalid email</div>
	 		</div>
	 	)
	 }

	constructor(){
	 	$('#email').on('blur', function(){

	 		var email_pattern 	= new RegExp (/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	 		var valid 			= email_pattern.test($(this).val())
	 		var error_msg		= $(this).siblings('.error-msg')
	 		
		 	if(valid){
		 		$(this).css("borderColor" , "#27ae60")
				$(error_msg).removeClass("invalid");
				$(this).attr("data-validity" , true);
		 	}
		 	else {
		 		$(this).css("borderColor" , "#e74c3c")
				$(error_msg).addClass("invalid");
				$(this).attr("data-validity" , false);
		 	}
		});


	 	$('#email').on('focus' , function(){
			$(this).css("borderColor" , "#f39c12")
		})

	}
}

class Message extends React.Component({

	render(props){
	 	return (
	 	 	<div className= "form-message form-component-wrapper">
	 			<div className ="error-msg">Can't be empty</div>
	 			<textarea id="message" name={this.props.name} type ="text" placeholder = {this.props.children}>
	 			</textarea>
	 		</div>
		)
	}

	constructor(){
		$('#message').on('blur' , function(){
			
			var valid 		= $(this).val().length >5
			var error_msg 	= $(this).siblings('.error-msg')

			if (valid) {
				$(this).css("borderColor" , "#27ae60")
				$(error_msg).removeClass("invalid");
				$(this).attr("data-validity" , true);
			}
			else {
				$(this).css("borderColor" , "#e74c3c")
				$(error_msg).addClass("invalid");
				$(this).attr("data-validity" , false);
			}

		})

		$('#message').on('focus' , function(){
			$(this).css("borderColor" , "#f39c12")
		})
	}

})

 class Submit extends React.Component({

	render(props){
	 	return (
	 	 	<div className= "form-submit form-component-wrapper">
	 			<button type="submit" className="">{this.props.children}</button>
	 		</div>
		)
	}

})



class Form extends React.Component({

	render (props){
		return (
			<form id="form-tag">
				<div className ="form-heading">
					<h1>let's chat</h1>
				</div>
				<div className ="form-wrapper">
					<div className = "form-components">
						{this.props.children}
					</div>
				</div>  
			</form>
		)
	}

	constructor(props) {
		var submitted 	= false
		var submit_URL 	= this.props.url
		$('form').attr('novalidate', 'true')
		$('#form-tag').on('submit', function(e){
			e.preventDefault()
			
			if (submitted) {return}

			var valid = true
			var form_data = {}
			var form_elements = $('#form-tag').find('input, textarea');

			form_elements.each(function(){
				$(this).focus()
				$(this).blur()
				form_data[$(this).attr('name')] = $(this).val()
				if ($(this).attr('data-validity') === "false")
					valid = false
			})

			if (valid) {
				$(this).find('button').addClass('loading')
				$.post(submit_URL, form_data, function(data){
					submitted = true
					setTimeout(function(){
						$(this).find('button').removeClass('loading')
						$(this).find('button').addClass('success')	
					}.bind(this), 1000)
				}.bind(this))
			} else {
				var form_dom = $(this).find('.form-wrapper, .form-heading')
				new TimelineMax({repeat: 3})
						.to(form_dom, 0.02, {x:10, borderColor: '#e74c3c'})
						.to(form_dom, 0.02, {x:0})
						.to(form_dom, 0.02, {x:-10})
						.to(form_dom, 0.02, {x:0, borderColor: '#DDD'})
			}
		})
	}
})

module.exports.Form 	= Form
module.exports.Name 	= Name
module.exports.Email 	= Email
module.exports.Message 	= Message
module.exports.Submit 	= Submit