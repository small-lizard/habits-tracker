import { Route, Routes } from 'react-router-dom';
import { LeftSideBar } from './components/LeftSideBar';
import { CalendarContainer } from './pages/Calendar/CalendarContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { useIsMobile } from './hooks/useIsMobile';
import { HabitsTrackerContainer } from './pages/HabitTracker/HabitsTrackerContainer';
import { MobileNavbar } from './components/variants/MobileNavbar';
import { Settings } from './pages/Settings/Settings';
import { useEffect } from 'react';
import { initHabits } from './store/habitsThunks';
import * as accountService from '../src/services/accountService';
import * as userActions from '../src/store/authSlice';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useIsMobile();
  const isSidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  function getMainClass(isMobile: boolean, isSidebarOpen: boolean) {
    if (isMobile) {
      return "main-mobile";
    }

    return isSidebarOpen ? "main sidebar-open" : "main sidebar-closed";
  }

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await accountService.checkAuth();

      dispatch(userActions.setUser({
        id: response.userId ?? '',
        isAuth: response.isAuth,
        name: response.name ?? '',
        email: response.email ?? '',
      }));

      await dispatch(initHabits(response.isAuth));
    }

    fetchAuth()
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
            <Route path="/" element={<HabitsTrackerContainer isMobile={isMobile} />} />
            <Route path="/calendar" element={<CalendarContainer isMobile={isMobile} />} />
            <Route path="/calendar/:habitId" element={<CalendarContainer isMobile={isMobile} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;

