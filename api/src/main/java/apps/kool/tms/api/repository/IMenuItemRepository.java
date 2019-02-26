package apps.kool.tms.api.repository;

import java.util.ArrayList;
import java.util.List;

import apps.kool.tms.api.agregate.MenuItem;

public interface IMenuItemRepository {
         ArrayList<MenuItem> addMeuItems(ArrayList<MenuItem> itemNames);
}
