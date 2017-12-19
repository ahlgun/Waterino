
function CHIP_SENSOR(position, cmd) {

	this.position = position;

	this.test = function(callback) {
		setTimeout(function() {
			return callback(null, Math.round(Math.random()*1027));
		}, 2000);
	};

	this.read = (callback) => {
		cmd.run("echo 's" + this.position + ":read' > /dev/ttyACM0");
		cmd.get("sed -n '1p' /dev/ttyACM0", (err, data, srderr) => {
			if(!err && data != null && data != undefined) return callback(null, data);
			else if(err) return callback(err);
			else return callback(srderr);
		}, 750);
	};
};

module.exports = CHIP_SENSOR;
