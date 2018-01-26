javascript:(
	function(){
	


	checkdomain();
	

	function checkdomain() {
		if(document.domain == "cis.ncu.edu.tw")
    	{
    		initTest();
    	}else if (document.domain == "portal.ncu.edu.tw") 
    	{
    		window.location.href = "https://portal.ncu.edu.tw/system/show/162";
    		alert("由於學校系統存取限制 請於新頁面再試一次 將自動轉址");
    	}else
    	{
    		window.location.href = "https://portal.ncu.edu.tw/system/show/162";
    		alert("請登入 portal 再試一次");
    	}
	}

	function initTest()
	{
	    // the minimum version of jQuery we want
	    var v = "1.12.0";
	    // check prior inclusion and version
	    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
	        var done = false;
	        var script = document.createElement("script");
	        var scriptCookie = document.createElement("script");
	        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
	        scriptCookie.src = "https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js";
	        script.onload = script.onreadystatechange = function(){
	            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
	                done = true;
	                getData();
	            }
	        };
	        document.getElementsByTagName("head")[0].appendChild(script);
	    } else {
	        getData();
	    }
	}

    function getData()
    {

		var list = new Array(0);

		if ($('frame[name="bottom"]', top.document)[0] == null )
		{
			window.location.href = "https://portal.ncu.edu.tw/system/show/162";
			alert('連線逾時，請重新')
			return
		}

    	var a = $(".list1", $('frame[name="bottom"]', top.document)[0].contentDocument).each(function()
		{
  			list.push($(this).text())
		});

		var data = new Array();

		for (var i = 0; i < list.length; i++) {
			data[i] = Array();
			for (var j = 0; j < 5; j++) {
				switch(j)
				{
					case 0:
		    			data[i][0] = a[i].children[0].innerHTML;
		    		break;
		    		case 3:
		    			data[i][1] = a[i].children[3].innerHTML;
		    		break;
		    		case 4:
		    			data[i][2] = a[i].children[4].innerHTML;
		    		break;
				}
			}
		}

		calcGPA(data);
    }

    function calcGPA(data) 
    {
    	var totalGP = 0.0;
    	var count = 0.0;
    	for (var i = 0; i < data.length; i++) 
    	{
			if (!isNaN(parseInt(data[i][1])) && !isNaN(data[i][2]))  
			{
				switch(true)
				{
					case(data[i][2]>=80 && data[i][2] <=100):
						totalGP += (4 * data[i][1]);
					break;
					case(data[i][2]>=70 && data[i][2] <80):
						totalGP += (3 * data[i][1]);
					break;
					case(data[i][2]>=60 && data[i][2] <70):
						totalGP += (2 * data[i][1]);
					break;
					case(data[i][2] <60):
						totalGP += (1 * data[i][1]);
					break;
				}
				count += parseInt(data[i][1]);
			}
			
		}

		alert("totalGP: " + totalGP + "\ncount: " + count + "\nGPA: " + (totalGP/count));
		//window.location.href = "https://portal.ncu.edu.tw/system/162"
    }

})();