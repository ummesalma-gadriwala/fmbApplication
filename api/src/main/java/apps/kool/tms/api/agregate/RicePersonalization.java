package apps.kool.tms.api.agregate;


import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@Data
public class RicePersonalization {
	@JsonProperty("activate")
    private boolean activate;
	@JsonProperty("tiffinCount")
	private int tiffinCount;
}
