var CHECKER = (function() {
var q = {};
var Fields = [],
dim,
numPlayers;

q.getFields = function() {
	return JSON.stringify(Fields);
};
q.init = function(dims, numplayers) {
	fields.length = 0;
	dim = dims || 2;
	numPlayers = numPlayers || 2;
};

q.realPlayerOf = function(coords) {
	var i = 0; l = Fields.length, counter = 0, j = 0, found = false;
	for(; i < l; i++) {
		counter = 0;
		for(j = 0; j < dim; j++) {
			console.log(Fields[i].coord[j] + ' vs ' + coords[j]);
			if(Fields[i].coord[j] == coords[j]) {
				counter ++;
			}
		}
		if(counter == dim) {
			console.log(Fields[i].player);
			found = true;
			break;
		}
	}
	return found ? Fields[i].player : -1;
};

q.checkWin = function(field) {
	Fields.push(field);
	var won = false, 
	P = [], 
	D = [],
	sp = field.player,
	j = 0,  i = 0,  k = 0,  m = 0,  h = 0,  counter = 0,  counter2 = 0,
	l = Fields.length;
	var z = ( Math.pow(3, (dim -1)) / 2 ) + Math.pow( 3, (dim -1)) ;
	for(; j < z; j++) {
		for(i = 0; i < dim; i++) {
			if(  ( j / parseInt( Math.pow(3, i))) % 3 == 0 ) {
				P[i] = 0;
				D[i] = 1;
			} else if( ( j / parseInt( Math.pow(3, i))) % 3 == 1) {
				P[i] = field.coord[i];
				D[i] = 0;
			} else {
				P[i] = dim;
				D[i] = -1;
			}
		}
		
		for(i = 0; i < l - 1; i++) {
			counter = 0;
			counter2 = 0;
			for(h = 0; h < dim; h++) {
				if(field.coord[h] + D[h] == Fields[i].coord[h]) {
					counter ++;
				}
				if(field.coord[h] - D[h] == Fields[i].coord[h]) {
					counter2 ++;
				}
			}
			if(counter == dim || counter2 == dim) {
				for(m = 0; m < dim; m++) {
					if(  ( j / parseInt( Math.pow(3, m))) % 3 == 0 ) {
						P[m] = 0;
					} else if( ( j / parseInt( Math.pow(3, m))) % 3 == 1) {
						P[m] = field.coord[m];
					} else {
						P[m] = dim;
					}
				}
				counter = 0;
				for(k = 0; k < dim + 1; k++) {
					var checkArray = [];
					for(m = 0; m < dim; m++) {
						checkArray[m] = P[m];
					}
					if(this.realPlayerOf(checkArray) == sp) {
						counter ++;
					}
					for(m = 0; m < dim; m++) {
						P[m] += D[m];
					}
				}
				if(counter == ( dim + 1 )) {
					won = true;
					return true;
				}
			}
			if(won) break;
		}	
		if(won) break;
	}
	return won;		
}
return q;
}());
