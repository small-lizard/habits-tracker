import { Route, Routes } from 'react-router-dom';
import { LeftSideBar } from './components/LeftSideBar';
import { CalendarContainer } from './pages/Calendar/CalendarContainer';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useIsMobile } from './hooks/useIsMobile';
import { HabitsTrackerContainer } from './pages/HabitTracker/HabitsTrackerContainer';
import { MobileNavbar } from './components/variants/MobileNavbar';

function App() {
  const isMobile = useIsMobile();
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  function getMainClass(isMobile: boolean, sidebarOpen: boolean) {
    if (isMobile) {
      return "main-mobile";
    }

    return sidebarOpen ? "main sidebar-open" : "main sidebar-closed";
  }


  return (
    <>
      {
        isMobile ? (<MobileNavbar />) : (<LeftSideBar />)
      }
      <main className={getMainClass(isMobile, sidebarOpen)}>
        <div className="content">
          <Routes>
            <Route path="/" element={<HabitsTrackerContainer isMobile={isMobile} />} />
            <Route path="/calendar" element={<CalendarContainer isMobile={isMobile} />} />
            <Route path="/calendar/:habitId" element={<CalendarContainer isMobile={isMobile} />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;

