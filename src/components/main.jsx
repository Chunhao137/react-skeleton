var React = require('react');
var Header = require('./header');
var TopicList = require('./topic-list');

//this.props.children when you have a parent Route that has children routes 
//i.e. 	<Route path="/" component={Main}>
  //          <Route path="1" component={Child1}/>
  //          <Route Path="2" component={Child2}/>
		 // </Route>

module.exports = React.createClass({
	render:function(){
		return <div>
			<Header />
			{this.content()}
		</div>
	},
	content:function(){
		if(this.props.children){
			return this.props.children;
		}else{
			return <TopicList />
		}
	}
});