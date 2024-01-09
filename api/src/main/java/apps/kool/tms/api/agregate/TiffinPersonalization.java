package apps.kool.tms.api.agregate;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Document("tiffinPersonalization")
public class TiffinPersonalization {
	@JsonIgnore
	private @Id  ObjectId id;
	@JsonIgnore
    private ObjectId subscriptionScheduleId;
	private String subscriberId;
	private RicePersonalization noRice;
	private PackageType packageType;
}
