package apps.kool.tms.api.repository;

import java.util.Date;
import java.util.List;

import apps.kool.tms.api.agregate.OverrideSubscriptionSchedule;
import apps.kool.tms.api.agregate.SubscriptionSchedule;

public interface ISubscriberScheduleRepository {
	
   SubscriptionSchedule saveSubscriptionSchedule(SubscriptionSchedule subscriptionSchedule);
   
   List<SubscriptionSchedule> getAllSubscriptionSchedule();
   
   SubscriptionSchedule getSubscriptionScheduleBySubscriberId (String subscriberId);
   
   OverrideSubscriptionSchedule updateOverrideSchedule (String subscriberId, OverrideSubscriptionSchedule overrideSubscriptionSchedule );
   
   SubscriptionSchedule updateSubscriptionSchedule (SubscriptionSchedule subscriptionSchedule );
   
   SubscriptionSchedule addSubscriptionSchedule (String subscriberId, OverrideSubscriptionSchedule overrideSubscriptionSchedule );
   
   boolean deleteOverrideSchedule(String subscriberId, String startDate) throws Exception ;
   
   
   
   
//   List<Person> getAllPersonPaginated(
//      int pageNumber, int pageSize);
//   Person findOneByName(String name);
//   List<Person> findByName(String name);
//   List<Person> findByBirthDateAfter(Date date);
//   List<Person> findByAgeRange(int lowerBound, int upperBound);
//   List<Person> findByFavoriteBooks(String favoriteBook);
//   void updateMultiplePersonAge();
//   Person updateOnePerson(Person person);
     //void dupdaeletePerson(Person person);

}
