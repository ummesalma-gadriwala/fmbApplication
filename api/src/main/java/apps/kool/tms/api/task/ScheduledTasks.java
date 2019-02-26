package apps.kool.tms.api.task;

import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
    
    @Autowired
    Environment environment;
    
    @Value("${scheduler.rest-url}")
    private String schedulerRestUrl;
    
    @Scheduled(fixedDelay= 60000)
    public void reportCurrentTime() {
        log.info("The time is now {}", dateFormat.format(new Date()));
        RestTemplate rest = new RestTemplate();
        rest.getForEntity(schedulerRestUrl+"user/token/hello", String.class);
    }
}