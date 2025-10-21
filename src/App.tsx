import { Route, Routes } from 'react-router-dom';
import { HabitsTracker } from './components/HabitsTracker';
import { LeftSideBar } from './LeftSideBar';

function App() {
  return (
    <div className='layout'>
      <LeftSideBar />
      <main className="main">
        <div className="content">
          <Routes>
            <Route path="/" element={<HabitsTracker />} />
            <Route path="/calendar" element={<div>Сalendar</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

