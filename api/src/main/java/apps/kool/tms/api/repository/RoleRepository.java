package apps.kool.tms.api.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import apps.kool.tms.api.agregate.Role;

public interface RoleRepository extends MongoRepository<Role, String>{
   Optional<Role> findByName(String name);
}
