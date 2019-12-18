package apps.kool.tms.api.agregate;


import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;


import lombok.Data;

@Data
@Document(collection= "review")
@CompoundIndexes({
    @CompoundIndex(name = "review_username_scheduleDate", unique = true,  def = "{'scheduleDate' : 1, 'username': 1}")
})

public class Review {
	private @Id  ObjectId id;
	@JsonFormat(pattern="yyyy-MM-dd")
	private java.util.Date scheduleDate;
	private String username;
	private String subscriberId;
	private List<InstructionMessage> questionAnswer;
}
