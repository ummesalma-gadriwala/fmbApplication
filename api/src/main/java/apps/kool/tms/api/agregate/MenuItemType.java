package apps.kool.tms.api.agregate;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public enum MenuItemType {
	GRAVY, 
	BREAD, 
	RICE, 
	SOUP, 
	NOODLES, 
	SALAD, 
	SWEET
}
