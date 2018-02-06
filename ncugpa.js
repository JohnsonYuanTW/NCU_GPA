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
    	var totalGP = new Array();
    	var acadYear = new Array();
    	var acadYearCount = new Array();
    	acadYear.push(data[0][0]);
    	totalGP.push(0);
    	acadYearCount.push(0);
    	for (var i = 0; i < data.length; i++) 
    	{
				if (!isNaN(parseInt(data[i][1])) && !isNaN(data[i][2]))  
				{
					if (data[i][0] != acadYear[(acadYear.length-1)]) 
					{
						acadYear.push(data[i][0]);
						acadYearCount.push(0);
						totalGP.push(0);
					}

					switch(true)
					{
						case(data[i][2]>=80 && data[i][2] <=100):
							totalGP[(acadYear.length-1)] += (4 * data[i][1]);
							break;
						case(data[i][2]>=70 && data[i][2] <80):
							totalGP[(acadYear.length-1)] += (3 * data[i][1]);
							break;
						case(data[i][2]>=60 && data[i][2] <70):
							totalGP[(acadYear.length-1)] += (2 * data[i][1]);
							break;
						case(data[i][2] <60):
							totalGP[(acadYear.length-1)] += (1 * data[i][1]);
							break;
					}

					acadYearCount[(acadYear.length-1)] += parseInt(data[i][1]);
				}
			}
			alertGPA(totalGP, acadYear, acadYearCount)
    }

    function alertGPA(totalGP, acadYear, acadYearCount) {
    	var msg = "";
    	var totalAcadYearCount = 0;
    	var totalAcadGP = 0;
    	for (var i = 0; i < acadYear.length; i++) {
    		msg += "您 " + acadYear[i] + " 的總學分是 " + acadYearCount[i] + " 該學期的 GPA 是 " + Math.round(totalGP[i] / acadYearCount[i] * 100) / 100 + "\n"
    		totalAcadYearCount += acadYearCount[i];
    		totalAcadGP += totalGP[i]
    	}
    	msg += "\n總學分數 " + totalAcadYearCount + "\n"
    	msg += "\nGPA 為 " + Math.round(totalAcadGP / totalAcadYearCount*100)/100;
    	alert(msg);
    }

})();