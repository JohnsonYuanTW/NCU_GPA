javascript:(
	function(){
	
	checkdomain();
	

	function checkdomain() {
		if(document.domain == "cis.ncu.edu.tw")
    	{
    		initTest()
    	}else if (window.location.href == "https://portal.ncu.edu.tw/system/162")
    	{
    		alert("忘記把 查詢成績 拉過去了嗎\n請到新頁面再按一次~");
    		window.location.replace = "https://cis.ncu.edu.tw/ScoreInquiries/student/student_record.php"
    	}else
    	{
    		window.location.replace = "https://portal.ncu.edu.tw/system/162"
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
    	var a = $(".list1").each(function()
		{
  			//console.log($(this).html());
  			list.push($(this).html())
		});

		var data = Array();
		    
		$("tbody tr").each(function(i, v){
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
		if (list.length==0) {
			window.location.href = "https://portal.ncu.edu.tw/system/162"
    		alert("請登入 portal 再試一次");
		}
		calcGPA(data);
    }

    function calcGPA(data) 
    {
    	var totalGPA = 0.0;
    	var count = 0.0;
    	for (var i = 0; i < data.length; i++) 
    	{
			if (!isNaN(parseInt(data[i][1])) && !isNaN(data[i][2]))  
			{
				switch(true)
				{
					case(data[i][2]>=80 && data[i][2] <=100):
						totalGPA += (4 * data[i][1]);
					break;
					case(data[i][2]>=70 && data[i][2] <80):
						totalGPA += (3 * data[i][1]);
					break;
					case(data[i][2]>=60 && data[i][2] <70):
						totalGPA += (2 * data[i][1]);
					break;
					case(data[i][2] <60):
						totalGPA += (1 * data[i][1]);
					break;
				}
				count += parseInt(data[i][1]);
				//console.log(data[i][1] + " " + data[i][2]);
			}
			
		}

		console.log(totalGPA / count);
    }

	})();