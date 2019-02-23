package apps.kool.tms.api.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import apps.kool.tms.api.agregate.Previlege;


public interface PrevilegeRepository extends MongoRepository<Previlege, String>{
	Optional<Previlege> findByName(String name);
}
