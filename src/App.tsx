import { Route, Routes } from 'react-router-dom';
import { HabitsTracker } from './pages/HabitTracker/HabitsTracker';
import { LeftSideBar } from './components/LeftSideBar';
import { Calendar } from './pages/Calendar/Calendar';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  return (
    <div className='layout'>
      <LeftSideBar />
      <main className={sidebarOpen ? "main sidebar-open" : "main sidebar-closed"}>
        <div className="content">
          <Routes>
            <Route path="/" element={<HabitsTracker />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendar/:habitId" element={<Calendar />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

