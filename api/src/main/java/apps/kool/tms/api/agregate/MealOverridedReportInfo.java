package apps.kool.tms.api.agregate;

import apps.kool.tms.api.utils.MealCountOverrideType;
import apps.kool.tms.api.utils.SectorName;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MealOverridedReportInfo {
   private SectorName sector;
   private String subscriberId;
   private String firstName;
   private String lastName;
   private int count;
   private MealCountOverrideType mealCountOverrideType;
   
}
