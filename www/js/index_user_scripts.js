/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #get_pos */
    $(document).on("click", "#get_pos", function(evt)
    {
         /*global uib_sb */
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($("#list"));  
         return false;
    });
    
        /* button  #get_pos */
    $(document).on("click", "#get_pos", function(evt)
    {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
