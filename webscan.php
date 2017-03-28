<?php

/**
 * Plugin Name:  Web Scan App
 * Plugin URI: http:titusshoats.com
 * Description: A plugin that scans a url and gives details about the server
 * Version: 1.0
 * Author: Titus Shoats
 * Author URI: http:/titusshoats.com
 * Text Domain: wsa_text_domain
 * License: GPLv2
 */



/****Admin Jquery****/
function web_scan_app_custom_plugin_javascript(){

    wp_enqueue_script( 'jquery-file','https://code.jquery.com/jquery-3.1.1.min.js' );
    wp_enqueue_script( 'ajax',plugin_dir_url(__FILE__).'js/app.js',false);


}

add_action( 'admin_enqueue_scripts', 'web_scan_app_custom_plugin_javascript');

/****Admin CSS****/
function web_scan_app_custom_plugin_css(){
  
     wp_register_style('custom-plugin-css',plugin_dir_url(__FILE__).'css/styles.css',false);
     wp_register_style('bootstrap-css','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',false);

    wp_enqueue_style('bootstrap-css');
    wp_enqueue_style('custom-plugin-css');

}
add_action('admin_enqueue_scripts','web_scan_app_custom_plugin_css');


/*****Custom Log file****/
if (!function_exists('write_log')) {
    function write_log ( $log )  {
        if ( true === WP_DEBUG ) {
            if ( is_array( $log ) || is_object( $log ) ) {
                error_log(write_log( $log, true ) );
            } else {
                error_log( $log );
            }
        }
    }
}


add_action('admin_menu','ubp_create_menu');


function ubp_create_menu(){

add_menu_page('Web URL Scan App','Web URL Scan','manage_options','web-url-scan','web_url_scan_plugin_page');
}


function web_url_scan_plugin_page(){
     ?>
        <div class="web-url-scan-container container">
        	  <div class="row scan-content-container">
          <div class="col-md-12 ">
              <h2>Web URL Security Scan</h2>
              <h3>Online Security Scanner to test vulnerabilities of a url. Checks include application security, WordPress plugins, hosting environment and web server.
              </h3>
          </div>

    </div>

    <div class="row scan-content-input-container">

       <div class="col-md-12 scan-loader" id="scan-loader">
            <h3 id="scan-h3" class="scan-h3">Scanning.....</h3>
<!--             <img id="image-loader" src="{{url('/img/loader.gif')}}" alt="">
 -->       </div>
          <form class="scan-form" id="scan-form" name="form" method="post" action="#" enctype="form-data">
              <?php wp_nonce_field('scanning-url','wbs_scan_url_nonce'); ?>


              <div class="col-md-4 ">
                      
                  <input class="form-control" type="text" name="scan-url" id="scan-url" placeholder="URL to Scan"/>
              </div>
              <br/>
              <br/>
             <div class="col-md-4 ">

                 <button type="button" id="submit" class="btn btn-danger">Run URL Scanner</button>
            </div> 

          </form>
    </div>

    <div class="row scan-details" id="scan-details">
         <h3>Analysis of <span id="url"></span></h3>

         <table class="table table-bordered table-condensed">
             <tr>
               <td rowspan="5" style="width:130px" rowspan="5" style="width:130px">
                 <img id="logo" src="<?php echo  plugins_url('images/scanner.png',__FILE__);?>"/>
               </td>
              
             </tr>
             <tr>
                <td> 
                <div id="details"></div>
                </td>
            
             </tr>
       
         </table>
    </div>
</div>
        </div>  
     <?php
}




?>

