window.onload = function() {
	var oname = document.getElementById('name');
	var ocontent = document.getElementById('content');
	var oul = document.getElementById('ull');
	var obtn = document.getElementById('btn');
	var lli = oul.getElementsByTagName('li');
	obtn.onclick = function(){
		oli = document.createElement('li');
		oh2 = document.createElement('h2');
		op  = document.createElement('p');
		oa  = document.createElement('a');
		oa.href = "javascript:;";


		oh2.innerHTML = oname.value + '：';
		op.innerHTML = ocontent.value;

		oli.appendChild(oh2);
		oli.appendChild(op);
		oli.appendChild(oa);
		if(lli.length > 0){
			oul.insertBefore(oli,lli[0]);
		}
		else{
			oul.appendChild(oli);
		}
	}



}