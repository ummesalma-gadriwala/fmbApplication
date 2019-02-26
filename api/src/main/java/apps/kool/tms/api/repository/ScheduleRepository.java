package apps.kool.tms.api.repository;


import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import apps.kool.tms.api.agregate.Schedule;

@Repository
public class ScheduleRepository implements IScheduleRepository {

private final MongoTemplate mongoTemplate;
	
    @Autowired
    public ScheduleRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

	@Override
	public Schedule findByDailyDate(Date dailyDate) {
		Query query = new Query();
		query.addCriteria(Criteria.where("dailyDate").in(dailyDate));
		Schedule schedule = mongoTemplate.findOne(query, Schedule.class);
		return schedule;
	}

	@Override
	public void save(Schedule schedule) {
		mongoTemplate.save(schedule);
		
	}

	@Override
	public List<Schedule> findByDailyDateBetween(java.util.Date dailyDateGT, java.util.Date dailyDateLT) {
		Query query = new Query();
		query.addCriteria(Criteria.where("dailyDate").gt(dailyDateGT).lte(dailyDateLT));
		List<Schedule> schedules = mongoTemplate.find(query, Schedule.class);
		return schedules;
	}
   
    
}
