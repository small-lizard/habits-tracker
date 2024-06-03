import './css/global.css';
import './css/SidebarButton.css';
import './css/Sidebar.css';
import './css/WeekHabits.css'
import { Route, Routes } from "react-router-dom";
import { WeekHabits } from './pages/WeekHabits';
import { Layout } from './pages/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/week" element={<WeekHabits />} />
      </Route>
    </Routes>
  );
}

export default App;
