import Sidebar from "../componenets/Sidebar"
import Map from "../componenets/Map"
import styles from './AppLayout.module.css'
import User from "../componenets/User"
function AppLayout() {
    return (
        <div className={styles.app}>
          <Sidebar/>
          <Map/>
          <User />
           
        </div>
    )
}

export default AppLayout
