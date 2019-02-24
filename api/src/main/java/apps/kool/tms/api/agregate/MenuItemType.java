package apps.kool.tms.api.agregate;

import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;

@Data
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
