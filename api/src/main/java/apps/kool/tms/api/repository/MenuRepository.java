package apps.kool.tms.api.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import apps.kool.tms.api.agregate.MenuAggregate;

public interface MenuRepository extends MongoRepository<MenuAggregate, String> {
	
	MenuAggregate findById(ObjectId _id);

}
