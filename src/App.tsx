import { Route, Routes } from 'react-router-dom';
import { HabitsTracker } from './pages/HabitTracker/HabitsTracker';
import { LeftSideBar } from './components/LeftSideBar';
import { Calendar } from './pages/Calendar/Calendar';

function App() {
  return (
    <div className='layout'>
      <LeftSideBar />
      <main className="main">
        <div className="content">
          <Routes>
            <Route path="/" element={<HabitsTracker />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

