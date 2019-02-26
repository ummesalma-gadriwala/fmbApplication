package apps.kool.tms.api.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import apps.kool.tms.api.agregate.MenuItem;

@Repository
public class MenuItemRepository implements IMenuItemRepository {

private final MongoTemplate mongoTemplate;
	
    @Autowired
    public MenuItemRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
    
	@Override
	public ArrayList<MenuItem> addMeuItems(ArrayList<MenuItem> menuItems) {
		menuItems.forEach(menuItem -> {
			MenuItem fetchedMenuItem = getMenuItem(menuItem.getItemName());
			if(fetchedMenuItem == null){
				mongoTemplate.save(menuItem);
			} else {
				menuItem.setId(fetchedMenuItem.getId());
			}
		});
	    return menuItems;
	}
	
	
	private MenuItem getMenuItem(String itemName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("itemName").is(itemName));
		MenuItem menuItem = mongoTemplate.findOne(query, MenuItem.class);
		return menuItem;
	}

}
