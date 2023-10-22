package apps.kool.tms.api.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.InstructionMessage;
import apps.kool.tms.api.utils.SectorName;

@RestController
@RequestMapping("/content")

public class ContentController {
	
	@RequestMapping(value="/contactInfo", method= RequestMethod.GET)
	public ResponseEntity<List<InstructionMessage>> getContactInfo() {
	 
	    ArrayList<InstructionMessage> contacts = new ArrayList<InstructionMessage>();
	    
	    InstructionMessage contactInfo = new InstructionMessage();
	    contactInfo.setMessageLabel("General FMB Related Queries");
	    contactInfo.setMessageValue("Bhai Aliasgar Khokhar | (647)-825-5786");
	    contacts.add(contactInfo);

	    InstructionMessage contactInfo1 = new InstructionMessage();
	    contactInfo1.setMessageLabel("Thali Addition Request Approval");
	    contactInfo1.setMessageValue("Bhai Hassan Doulatganjwala | (289) 885-1728");
	    contacts.add(contactInfo1);
	    
	    InstructionMessage contactInfo2 = new InstructionMessage();
	    contactInfo2.setMessageLabel("App Related Issue");
	    contactInfo2.setMessageValue("Bhai Ismail Raja | (902)-580-5152");
	    contacts.add(contactInfo2);
	    
		return ResponseEntity.ok(contacts);
	}
	
	@RequestMapping(value="/sectors", method= RequestMethod.GET)
	public ResponseEntity<List<InstructionMessage>> getSectorNames() {
	   ArrayList<InstructionMessage> sectors = new ArrayList<InstructionMessage>();
	   for (SectorName sectorName : SectorName.values()) { 
	    	InstructionMessage sector = new InstructionMessage();
	    	sector.setMessageLabel(sectorName.name());
	    	sector.setMessageValue(sectorName.name());
	    	sectors.add(sector);
        }
	 	return ResponseEntity.ok(sectors);
	}





}
