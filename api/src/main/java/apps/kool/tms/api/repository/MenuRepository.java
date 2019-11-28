package apps.kool.tms.api.repository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import apps.kool.tms.api.agregate.Menu;
import apps.kool.tms.api.agregate.MenuItem;

@Repository
public class MenuRepository implements IMenuRepository  {
	private final MongoTemplate mongoTemplate;
	
    @Autowired
    public MenuRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

	@Override
	public void saveMenu(Menu menu) {
		mongoTemplate.save(menu);
	}

	@Override
	public Menu findMenuByItems(List<MenuItem> items) {
		Query query = new Query();
		query.addCriteria(Criteria.where("items.$id").all(items.stream().map(menuItem -> menuItem.getId()).collect(Collectors.toList())));
		Menu menu = mongoTemplate.findOne(query, Menu.class);
		return menu;
		//db.getCollection('menu').find({ "" : { $all:[ ObjectId("5c72d2a6db945f541838b9e3"), ObjectId("5c72d2a6db945f541838b9e5")] }})
		
	}

	
}
