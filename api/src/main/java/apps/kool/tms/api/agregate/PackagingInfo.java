package apps.kool.tms.api.agregate;

import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PackagingInfo {
     private int tiffinCount;
     private int cancellationScheduleCount;
     private int additionScheduleCount;
     private int noRiceTiffinCount; 
     private int noRiceCancellationCount;
     private int noRiceAdditionCount;
     private Map<PackageType, PackagingCountInfo> packageTypeTiffinCount;
     private List<MealOverridedReportInfo> overrideDetails;
}
