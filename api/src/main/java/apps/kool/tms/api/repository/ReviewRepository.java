package apps.kool.tms.api.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import apps.kool.tms.api.agregate.Contributor;
import apps.kool.tms.api.agregate.Review;
import apps.kool.tms.api.agregate.Schedule;


@Repository
public class ReviewRepository implements IReviewRepository {

	private final MongoTemplate mongoTemplate;
	
    @Autowired
    public ReviewRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
	
	@Override
	public void saveorUpdateReview(Review review) {
		mongoTemplate.save(review);
	}

	@Override
	public List<Review> findReviewByScheduleDate(java.util.Date scheduleDate) {
		Query query = new Query();
		query.addCriteria(Criteria.where("scheduleDate").is(scheduleDate));
	    List<Review>  reviews = mongoTemplate.find(query, Review.class);
		return reviews;
	}

	@Override
	public Review findReviewByUserIdAndScheduleDate(String username, java.util.Date scheduleDate) {
		Query query = new Query();
		query.addCriteria(Criteria.where("scheduleDate").is(scheduleDate)
		    	.andOperator(Criteria.where("username").is(username)));
	    Review  review = mongoTemplate.findOne(query, Review.class);
		return review;
	}
	
	@Override
	public List<Review> findReviewByUserIdBetweenDate(String username, java.util.Date fromDate, java.util.Date toDate ) {
		Query query = new Query();
		query.addCriteria(Criteria.where("scheduleDate").gte(fromDate)
				.andOperator(Criteria.where("scheduleDate").lte(toDate)
		    	.andOperator(Criteria.where("username").is(username))));
	    List<Review>  reviews = mongoTemplate.find(query, Review.class);
		return reviews;
	}

}
