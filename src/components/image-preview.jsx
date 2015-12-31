var React = require('react');

module.exports = React.createClass({
	render:function(){
		return <div className="imageBox">
			{this.image()}
		</div>
	},
	image:function(){
		var link = "http://i.imgur.com/" + this.props.id +"h.jpg";
		return <div  >
			<img src={link}/>
			</div>
	}
})