package org.camden.plugin;
 
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

public class HelloPlugin extends CordovaPlugin {
    
    public static final String ACTION_SAY_HELLO = "sayHello"; 

    @Override
    public boolean execute(String action, JSONArray args, 
						   CallbackContext callbackContext) 
		throws JSONException {
        donut;
        if (ACTION_SAY_HELLO.equals(action)) { 
            JSONObject arg_object = args.getJSONObject(0);
            String name = arg_object.getString("name");
            //If Bob, we have an error
            if(name.equals("Bob")) {
                callbackContext.error("Bob is a bad name!");
                return false;
            }
			String result = "Hello, "+name;
            callbackContext.success(result);
            return true;
        }

        callbackContext.error("Invalid action");
        return false;
        
    }
    
}