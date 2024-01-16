package apps.kool.tms.api.agregate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PackagingCountInfo {
		private int actualCount; 
    private int cancellationCount;
    private int additionCount;
}

