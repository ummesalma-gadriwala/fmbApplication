package apps.kool.tms.api.resources;



import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import apps.kool.tms.api.repository.IContributorRepository;
import apps.kool.tms.api.repository.IMenuItemRepository;
import apps.kool.tms.api.repository.IMenuRepository;
import apps.kool.tms.api.repository.IScheduleRepository;
import apps.kool.tms.api.repository.UserRepository;
import apps.kool.tms.api.reqres.AddContributorRequest;
import apps.kool.tms.api.reqres.AddMenuRequest;
import apps.kool.tms.api.utils.ContributionType;
import apps.kool.tms.api.utils.ScheduleUtils;
import apps.kool.tms.api.agregate.InstructionMessage;
import  apps.kool.tms.api.agregate.MenuItem;
import apps.kool.tms.api.agregate.MenuItemType;
import apps.kool.tms.api.errorhandling.EntityNotFoundException;

@RestController
@RequestMapping("/admin")
public class AdminPublishController {
	
	@Autowired
	IMenuItemRepository menuItemRepository;
	
	@Autowired
	IMenuRepository menuRepository;
	
	@Autowired
	IScheduleRepository scheduleRepository;
	
	@Autowired
	UserRepository users; 
	
	@Autowired
	IContributorRepository contributorRepository;
		
	@RequestMapping(method = RequestMethod.POST, value = "/schedule")
	public ResponseEntity<Boolean> publishSchedule(@RequestBody String schedulePublishData ) throws Exception {
		
		ArrayList<HashMap<String, String>> schedulePublishDataMap = new ArrayList<HashMap<String, String>>();

		ObjectMapper objectMapper = new ObjectMapper();
		schedulePublishDataMap = objectMapper.readValue(schedulePublishData,  new TypeReference<List<Map<String, String>>>(){});
		ArrayList<AddMenuRequest> menuRequests = new ArrayList<AddMenuRequest>();
		ArrayList<AddContributorRequest> contriutorRequests = new ArrayList<AddContributorRequest>();
		 
		schedulePublishDataMap.stream().forEach(schedule -> {
			menuRequests.add(buildMenuSchedule(schedule));
			if(schedule.get("NoThaali").equals("No")) {	
				AddContributorRequest tiffinContributor = AddContributorRequest.builder()
						                                                       .contributionType(ContributionType.tiffin)
						                                                       .isContributorAllowedToChooseMenu(false)
						                                                       .contributionDate(schedule.get("MenuDate"))
						                                                       .subscriberId(schedule.get("Khidmat"))
						                                                       .build();
				contriutorRequests.add(tiffinContributor);
				if(StringUtils.isNotEmpty(schedule.get("SalwaatFatehaName")) ){
				 InstructionMessage fatehaMessage = new InstructionMessage();
				 fatehaMessage.setMessageLabel("Fateha");
				 fatehaMessage.setMessageValue(schedule.get("SalwaatFatehaName"));
				 List <InstructionMessage> messages = new ArrayList<InstructionMessage>();
				 messages.add(fatehaMessage);
				 AddContributorRequest fatehaSalwaatContributor = AddContributorRequest.builder()
																				.contributionType(ContributionType.fateha)
														                        .isContributorAllowedToChooseMenu(true)
														                        .contributionDate(schedule.get("MenuDate"))
														                        .subscriberId(schedule.get("SalwaatFatehaKhidmat"))
														                        .messageFromContributor(messages)
														                        .build();
				 contriutorRequests.add(fatehaSalwaatContributor);
				}
				
			}
		});
		if(menuRequests.size() > 0) {
			ScheduleUtils.addMenuToSchedule(menuRequests, menuItemRepository, menuRepository, scheduleRepository);
		}
		if(contriutorRequests.size() > 0) {
			contriutorRequests.forEach(contributorRequest -> {
				try {
					ScheduleUtils.addOrUpdateContributor(contributorRequest, users, scheduleRepository, contributorRepository);
				} catch (ParseException e) {
					e.printStackTrace();
				} catch (EntityNotFoundException enf) {
					enf.printStackTrace();
				}
			    
			});
			
		}
		return ResponseEntity.ok(true);
	}

	private AddMenuRequest buildMenuSchedule(HashMap<String, String> schedule) {
		ArrayList<MenuItem> menuItems = new ArrayList<MenuItem>();
		if(StringUtils.isNotEmpty(schedule.get("Gravy")) ){
			MenuItem gravyMenuItem = MenuItem.builder()
					                         .itemName(schedule.get("Gravy"))
					                         .quantity(schedule.get("GravyQty"))
					                         .menuItemType(MenuItemType.GRAVY)
					                         .build();
			menuItems.add(gravyMenuItem);
		} 
		if(StringUtils.isNotEmpty(schedule.get("Rice")) ){
			MenuItem riceMenuItem = MenuItem.builder()
		            .itemName(schedule.get("Rice"))
		            .quantity(schedule.get("RiceQty"))
		            .menuItemType(MenuItemType.RICE)
		            .build();
			menuItems.add(riceMenuItem);
		} 
		if(StringUtils.isNotEmpty(schedule.get("Soup")) ){
			MenuItem soupMenuItem = MenuItem.builder()
		            .itemName(schedule.get("Soup"))
		            .quantity(schedule.get("SoupQty"))
		            .menuItemType(MenuItemType.SOUP)
		            .build();
			menuItems.add(soupMenuItem);
		} 
		if( StringUtils.isNotEmpty(schedule.get("Bread")) ){
			MenuItem breadMenuItem = MenuItem.builder()
		            .itemName(schedule.get("Bread"))
		            .quantity(schedule.get("BreadQty"))
		            .menuItemType(MenuItemType.BREAD)
		            .build();
			menuItems.add(breadMenuItem);
		} 
		if(StringUtils.isNotEmpty(schedule.get("Salad")) ){
			MenuItem saladMenuItem = MenuItem.builder()
		            .itemName(schedule.get("Salad"))
		            .quantity(schedule.get("SaladQty"))
		            .menuItemType(MenuItemType.SALAD)
		            .build();
			menuItems.add(saladMenuItem);
		} 
		if(StringUtils.isNotEmpty(schedule.get("NoodlePasta")) ){
			MenuItem noodleMenuItem = MenuItem.builder()
		            .itemName(schedule.get("NoodlePasta"))
		            .quantity(schedule.get("NoodlePastaQty"))
		            .menuItemType(MenuItemType.NOODLES)
		            .build();
			menuItems.add(noodleMenuItem);
		} 
		if(StringUtils.isNotEmpty(schedule.get("SalwaatFateha")) ){
			MenuItem salwaatFatehaMenuItem = MenuItem.builder()
		            .itemName(schedule.get("SalwaatFateha"))
		            .quantity(schedule.get("SalwaatFatehaQty"))
		            .menuItemType(MenuItemType.SWEET)
		            .build();
			menuItems.add(salwaatFatehaMenuItem);
		}
		
		
		 InstructionMessage message = new InstructionMessage();
		 message.setMessageLabel("Message");
		 message.setMessageValue(schedule.get("Message"));
		 ArrayList <InstructionMessage> messages = new ArrayList<InstructionMessage>();
		 messages.add(message);
		 AddMenuRequest menuRequest = AddMenuRequest.builder().menuDate(schedule.get("MenuDate"))
				                                             .noMeal(schedule.get("NoThaali").equals("Yes") ? true : false)
				                                             .noMealReason((String)schedule.get("Reason"))
				                                             .menuItems(menuItems)
				                                             .instructionsForSubscriber(messages)
				                                             .build();
		return menuRequest;
	}
		
		
	


	
}
