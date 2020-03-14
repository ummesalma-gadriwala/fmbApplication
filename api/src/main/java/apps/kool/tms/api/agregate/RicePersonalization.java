package apps.kool.tms.api.agregate;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RicePersonalization {
    private boolean activate;
	private int tiffinCount;
}
