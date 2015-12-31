var Api  = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions')


module.exports = Reflux.createStore({
	listenables: [Actions], //this is saying if you trigger an Action with the same name as any methods below, call that method
	getTopics: function(){
		return Api.get('topics/defaults')
			.then(function(json){
				this.topics = json.data;
				this.triggerChange();
			}.bind(this));
	},
	triggerChange:function(){
		this.trigger('change', this.topics);
	}
})