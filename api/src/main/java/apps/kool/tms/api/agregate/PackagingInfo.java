package apps.kool.tms.api.agregate;

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
}
