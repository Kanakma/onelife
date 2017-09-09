const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
	period:Number,
	year:Number,
	schedule:[{
		auditory:{ type:mongoose.Schema.Types.ObjectId, ref:'Auditory'},
		monday:{
			a:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			b:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			c:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			d:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			e:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			f:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			g:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			h:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			i:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			j:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			k:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			l:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			m:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			n:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			o:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			}
		},
		tuesday:{
			a:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			b:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			c:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			d:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			e:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			f:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			g:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			h:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			i:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			j:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			k:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			l:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			m:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			n:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			o:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			}
		},
		wednesday:{
			a:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			b:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			c:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			d:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			e:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			f:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			g:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			h:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			i:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			j:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			k:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			l:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			m:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			n:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			o:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			}
		},
		thursday:{
			a:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			b:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			c:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			d:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			e:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			f:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			g:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			h:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			i:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			j:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			k:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			l:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			m:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			n:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			o:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			}
		},
		friday:{
			a:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			b:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			c:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			d:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			e:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			f:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			g:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			h:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			i:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			j:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			k:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			l:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			m:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			n:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			o:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			}
		},
		saturday:{
			a:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			b:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			c:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			d:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			e:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			f:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			g:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			h:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			i:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			j:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			k:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			l:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			m:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			n:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			},
			o:{
				subject:{type:mongoose.Schema.Types.ObjectId, ref:'Subject'},
				groups:[{type:mongoose.Schema.Types.ObjectId, ref:'Group'}]
			}
		}
	}]
});

module.exports = mongoose.model('Schedule', ScheduleSchema);