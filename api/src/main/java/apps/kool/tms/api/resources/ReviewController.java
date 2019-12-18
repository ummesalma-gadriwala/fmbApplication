package apps.kool.tms.api.resources;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.Review;
import apps.kool.tms.api.repository.IReviewRepository;

@RestController
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	IReviewRepository reviewRepository;
	
	//@PreAuthorize("hasRole('FMB_ROLE_OPERATIONS')")
		@RequestMapping(method = RequestMethod.POST)
		ResponseEntity<Boolean> add(@RequestBody Review review ) throws ParseException {
			reviewRepository.saveorUpdateReview(review);
			return ResponseEntity.ok(true);
		}
		
		@RequestMapping(method = RequestMethod.PUT)
		ResponseEntity<Boolean> update(@RequestBody Review review ) throws ParseException {
			reviewRepository.saveorUpdateReview(review);
			return ResponseEntity.ok(true);
		}
		
		@RequestMapping( value = "/{username}/{scheduleDate}",  method = RequestMethod.GET)
		ResponseEntity<Review> getReviewForUser(@PathVariable String username, @PathVariable String scheduleDate ) throws ParseException {
			
			return ResponseEntity.ok
						(reviewRepository.findReviewByUserIdAndScheduleDate(username,
																			new SimpleDateFormat("yyyy-MM-dd").parse(scheduleDate)));
		}
		
		@RequestMapping( value = "/{scheduleDate}",  method = RequestMethod.GET)
		ResponseEntity<List<Review>> getReviewForScheduleDate(@PathVariable String scheduleDate ) throws ParseException {
			
			return ResponseEntity.ok
						(reviewRepository.findReviewByScheduleDate(new SimpleDateFormat("yyyy-MM-dd").parse(scheduleDate)));
		}
		
		@RequestMapping( value = "/{username}/{fromDate}/{toDate}",  method = RequestMethod.GET)
		ResponseEntity<List<Review>> getReviewForUser(@PathVariable String username, @PathVariable String fromDate, @PathVariable String toDate ) throws ParseException {
			
			return ResponseEntity.ok
						(reviewRepository.findReviewByUserIdBetweenDate(username,
																		new SimpleDateFormat("yyyy-MM-dd").parse(fromDate),
																		new SimpleDateFormat("yyyy-MM-dd").parse(toDate)
																		));
		}
	
}
