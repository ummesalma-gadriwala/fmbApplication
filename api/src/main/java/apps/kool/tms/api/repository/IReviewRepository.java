package apps.kool.tms.api.repository;
import java.util.List;
import apps.kool.tms.api.agregate.Review;

public interface IReviewRepository {
	void saveorUpdateReview(Review review);
	List<Review> findReviewByScheduleDate( java.util.Date scheduleDate );
	Review findReviewByUserIdAndScheduleDate (String username, java.util.Date scheduleDate);
	public List<Review> findReviewByUserIdBetweenDate(String username, java.util.Date fromDate, java.util.Date toDate );
}
