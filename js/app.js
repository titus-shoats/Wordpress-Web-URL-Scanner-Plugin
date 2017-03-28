$(document).ready(function(){
	      var submit = $("#submit");
	      var scandetails = $("#scan-details");
	      var scanform = $("#scan-form");
	      var scanloader = $("#scan-loader");
	      var scanh3 = $("#scan-h3");
	      $(scanloader).hide();


	      function js_traverse(o) {
	        var type = typeof o;
	     

	        if (type == "object") {
	            for (var key in o) {
	                   var details_content = document.createElement("div");

	                        
	                        if(key ==="0" || key === "string" || key === "plugins" || key ==="module"){
	                          
	                        }else{
	                            details_content.innerHTML =  "Scanned:: " + key;
	                            details_content.className = "details_content";

	                            document.getElementById("details").appendChild(details_content);
	                            
	                        }
	                         js_traverse(o[key]); 
	                           
	                
	            }

	        }

	        if(type !== "object"){
	                var value = document.createElement("div");
	                value.innerHTML =  "Detected:: " + o ;
	                value.className = "value";
	                value.style.borderBottom = "1px solid lightgrey";
	                document.getElementById("details").appendChild(value);   
	        }
	   } 



		function isUrl(s) {
		   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		   return regexp.test(s);
		}  

		function xss_vector_map(){
		  return entityMap = {
		  '&': '&amp;',
		  '<': '&lt;',
		  '>': '&gt;',
		  '"': '&quot;',
		  "'": '&#39;',
		  '/': '&#x2F;',
		  '`': '&#x60;',
		  '=': '&#x3D;'
		};
		}


       /*****Escape/ Replaces caught xss vectors*****/
		function escapeHtml (string) {
		  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
		    if(xss_vector_map()[s]){
		    return "";
		    }
		  });
		}


      $(submit).on('click',function(e){
      			  e.preventDefault();
			      var scan_url = $('#scan-url');
			      var scan_url_value = $('#scan-url').val();
			      var wbs_scan_url_nonce = $('#wbs_scan_url_nonce').val();
			      var xss_filter = '';

			      $('.details_content').each(function(index){
			               $(this).remove();
			      });
			      $('.value').each(function(index){
			               $(this).remove();
			      });

			          
			          if(scan_url_value){

			                /***If Scan url is a valid url****/
			               if(isUrl(scan_url_value)){

				                   $(scandetails).hide();
				                   $(scanform).hide();
				                   $(scanloader).show();

					               jQuery.ajax({
					                   url:'http://50.63.161.157/scanapp/index.php',
					                   type:'GET',
					                   data:{
					                       wbs_scan_url_value:scan_url_value,
					                       wbs_scan_url_nonce:wbs_scan_url_nonce
					                   },
					                   success:function(data){
					                   	              var json_data = JSON.parse(data);

                                                     if(json_data.invalid_url ==="Invalid URL"){
                                                        document.getElementById('scan-url').value = "Invalid URL";
                                                        

                                                     }else{

                                                             var json_data = JSON.parse(data);
					                       
								                             if(json_data.wp_nonce==wbs_scan_url_nonce){
				                                                  jQuery.ajax({
									                              url:"http://50.63.161.157/scanapp/scan_results.php",
									                              type:"GET",
									                              success:function(response){
									                                   $.each(response,function(key,value){

									                                           /****If our object is not empty****/ 
									                                         if(Object.keys(value).length !== 0){
									                                              
									                                             document.getElementById('url').innerHTML = value.target;

									                                             js_traverse(value); 

									                                         }
									                                   });

									                              },
									                              error:function(response){
									                                   console.log(response);
									                              }
									                          });
								                       
                                                          }
                                              
                                                     }
                                               
					                       
					                      

					 
					                        $(scandetails).show();
					                        $(scanform).show();
					                        $(scanloader).hide();

					                   },
					                   error:function(xhr,error,c){
					                      console.log(error);
					                      if(error){
					                         $("#scan-h3").html("Invalid URL, Please try again.");
					                         setTimeout(function(){
					                             $("#scan-h3").html("Scanning");
					                            $(scandetails).show();
					                             $(scanform).show();
					                             $(scanloader).hide();
					                         },3000);
					                        
					                      }

					                   }
					               }); 

			             
			                         
			                       
			               }else{
			                 $('#scan-url').val("Please enter a valid URL");


			               }
			               
			          }else{
			              $('#scan-url').prop('placeholder','Please Enter a Valid URL');
			          }


			     });
         
          });


