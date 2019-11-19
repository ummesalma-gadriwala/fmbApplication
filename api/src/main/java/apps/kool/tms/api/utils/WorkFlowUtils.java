package apps.kool.tms.api.utils;

import apps.kool.tms.api.agregate.User;

public class WorkFlowUtils {
	
	//TODO Add real Verification Logic By Registartion Story.
	//This is temporary once Workflow engine is ready will move to WorkFlow engine.
	 public static boolean hasSubscriberVerifiedInfo(User user){
		 return user.isHasSubscriberVerifiedInfo();
	 }

}
