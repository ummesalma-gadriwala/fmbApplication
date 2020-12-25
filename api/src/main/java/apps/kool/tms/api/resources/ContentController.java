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
	    contactInfo.setMessageValue("Bhai Murtaza Patanwala | (416)-618-8486");
	    contacts.add(contactInfo);

	    InstructionMessage contactInfo1 = new InstructionMessage();
	    contactInfo1.setMessageLabel("Thali Addition Request Approval");
	    contactInfo1.setMessageValue("Bhai Quresh Motiwala | (647)-997-5251");
	    contacts.add(contactInfo1);
	    
	    InstructionMessage contactInfo2 = new InstructionMessage();
	    contactInfo2.setMessageLabel("App Related Issue");
	    contactInfo2.setMessageValue("Bhai Muffaddal Poonawala | (365)-998-5253");
	    contacts.add(contactInfo2);
	    

	    InstructionMessage contactInfo3 = new InstructionMessage();
	    contactInfo3.setMessageLabel("App Related Issue");
	    contactInfo3.setMessageValue("Bhai Nuruddin Bawangaonwala | (647)-704-6181");
	    contacts.add(contactInfo3);
	
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
