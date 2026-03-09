import { Route, Routes } from 'react-router-dom';
import { CalendarContainer } from './pages/Calendar/CalendarContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { useIsMobile } from './hooks/useIsMobile';
import { HabitsTrackerContainer } from './pages/HabitTracker/HabitsTrackerContainer';
import { MobileNavbar } from './components/navigationVariants/MobileNavbar';
import { Settings } from './pages/Settings/Settings';
import { useEffect, useState } from 'react';
import { initHabits } from './store/habitsThunks';
import * as accountService from '../src/services/accountService';
import * as userActions from '../src/store/authSlice';
import { LeftSideBar } from './components/navigationVariants/LeftSideBar';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useIsMobile();
  const isSidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
  const [isLoading, setLoading] = useState(true);

  function getMainClass(isMobile: boolean, isSidebarOpen: boolean) {
    if (isMobile) {
      return "main-mobile";
    }

    return isSidebarOpen ? "main sidebar-open" : "main sidebar-closed";
  }

  useEffect(() => {
    const guestMode = localStorage.getItem("guest_mode");

    const load = async () => {
      if (!guestMode || guestMode === "true") {
        localStorage.setItem("guest_mode", "true");
        accountService.warmUpServer();
      }

      if (guestMode === "false") {
        await accountService.warmUpServer();
        const response = await accountService.checkAuth();
        dispatch(userActions.setUser({
          id: response.userId ?? '',
          isAuth: response.isAuth,
          name: response.name ?? '',
          email: response.email ?? '',
        }));
      }

      await dispatch(initHabits());
      setLoading(false);
    }

    load();
  }, []);

  return (
    <>
      <nav>
        {
          isMobile ? (<MobileNavbar isMobile={isMobile} />) : (<LeftSideBar isMobile={isMobile} />)
        }
      </nav>
      <main className={getMainClass(isMobile, isSidebarOpen)}>
        <div className="content">
          <Routes>
            <Route path="/" element={<HabitsTrackerContainer isMobile={isMobile} isLoading={isLoading} />} />
            <Route path="/calendar/:habitId?" element={<CalendarContainer isMobile={isMobile} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;