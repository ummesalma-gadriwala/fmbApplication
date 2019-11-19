package apps.kool.tms.api;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import apps.kool.tms.api.agregate.Address;
import apps.kool.tms.api.agregate.Previlege;
import apps.kool.tms.api.agregate.Role;
import apps.kool.tms.api.agregate.User;
import apps.kool.tms.api.repository.PrevilegeRepository;
import apps.kool.tms.api.repository.RoleRepository;
import apps.kool.tms.api.repository.UserRepository;

@Component
public class InitialDataLoader implements ApplicationListener<ContextRefreshedEvent> {
    
	boolean alreadySetup = false;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired 
	private PrevilegeRepository privilegeRepository;
	
	@Override
	@Transactional
	public void onApplicationEvent(ContextRefreshedEvent event) {
		if (alreadySetup)
			return;
		//For Future Prvillages
		Previlege subscriberPrivilege = createPrivilegeIfNotFound("FMB_SUBSCRIBER_PRIVILEGE");
		Previlege mealReportPrevilage = createPrivilegeIfNotFound("FMB_OPERAION_MEAL_REPORT_PRIVILEGE");
		Previlege opeartionMenuSetup = createPrivilegeIfNotFound("FMB_OPERAION_MENU_SETUP_PRIVILEGE");
		
		Previlege systemPrivilege = createPrivilegeIfNotFound("FMB_SYSTEM_PRIVILEGE");
		List<Previlege> superPrivileges = Arrays.asList(subscriberPrivilege, mealReportPrevilage,opeartionMenuSetup, systemPrivilege);
		List<Previlege> adminPrivileges = Arrays.asList(subscriberPrivilege, mealReportPrevilage,opeartionMenuSetup);
		List<Previlege> subscriberPrivileges = Arrays.asList(subscriberPrivilege);
		createRoleIfNotFound("FMB_ROLE_SUPER", superPrivileges);
		createRoleIfNotFound("FMB_ROLE_OPERATIONS", adminPrivileges);
		createRoleIfNotFound("FMB_ROLE_SUBSCRIBER", subscriberPrivileges);
		Role subscriberRole = roleRepository.findByName("FMB_ROLE_SUBSCRIBER").orElse(null);
		
		List<User> users = userRepository.findAll();
		users.forEach(user -> {
		    if(user.getRoles()==null || !user.getRoles().contains(subscriberRole)){
				user.setRoles(Arrays.asList(subscriberRole));
				userRepository.save(user);
			}
		});
		alreadySetup = true;
	}
        @Transactional
		private Previlege createPrivilegeIfNotFound(String name) {
			Previlege previlege = privilegeRepository.findByName(name).orElse(null);
			if (previlege == null) {
				previlege = new Previlege();  
				previlege.setName(name);
				privilegeRepository.save(previlege);
			}
			return previlege;
		}

		@Transactional
		private Role createRoleIfNotFound(String name, List<Previlege> previleges) {
		    Role role = roleRepository.findByName(name).orElse(null);
			if (role == null) {
				role = new Role();
				role.setName(name);
				role.setPrevileges(previleges);
				roleRepository.save(role);
			}
			return role;
		}
}