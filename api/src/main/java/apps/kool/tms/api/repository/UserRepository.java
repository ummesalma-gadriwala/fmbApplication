package apps.kool.tms.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import apps.kool.tms.api.agregate.User;

public interface UserRepository extends MongoRepository<User, String> {
	User findByUserName(String userName);

}
