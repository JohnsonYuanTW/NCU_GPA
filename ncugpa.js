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
    		alert("由於網域不同 請於新頁面再試一次");
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
	        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
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

    	var a = $(".list1", $('frame[name="bottom"]', top.document)[0].contentDocument).each(function()
		{
  			list.push($(this).text())
		});

    	//console.log(a[0].children[0].innerHTML)

		var data = new Array();
/*
		$($("tbody tr"), list).each(function(i, v){
		    data[i] = Array();
		    $(this).children('td').each(function(ii, vv){
		    	switch(ii)
		    	{
		    		case 0:
		    			data[i][0] = $(this).text();
		    		break;
		    		case 3:
		    			data[i][1] = $(this).text();
		    		break;
		    		case 4:
		    			data[i][2] = $(this).text();
		    		break;
		    	}
		    }); 
		})
*/
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


		console.log("data: " + data)

		if (list.length==0) {
			window.location.href = "https://portal.ncu.edu.tw/system/show/162";
    		alert("連線逾時 / 網域錯誤\n請重新再試一次");
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
		window.location.href = "https://portal.ncu.edu.tw/system/162"
    }

	})();