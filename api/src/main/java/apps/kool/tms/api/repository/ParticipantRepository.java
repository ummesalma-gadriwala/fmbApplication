package apps.kool.tms.api.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import apps.kool.tms.api.agregate.ParticipantAggregate;

public interface ParticipantRepository extends MongoRepository<ParticipantAggregate, String> {
	
	ParticipantAggregate findById(ObjectId _id);

}
