package apps.kool.tms.api.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import apps.kool.tms.api.agregate.User;

public interface UserRepository extends MongoRepository<User, String> {
	Optional<User> findByUsername(String username);
}
