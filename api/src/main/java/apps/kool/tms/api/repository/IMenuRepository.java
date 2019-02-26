package apps.kool.tms.api.repository;

import java.util.List;

import apps.kool.tms.api.agregate.Menu;
import apps.kool.tms.api.agregate.MenuItem;

public interface IMenuRepository {
	
	void saveMenu(Menu menu);
	Menu findMenuByItems( List<MenuItem> items );
	
	

}
