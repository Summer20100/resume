// App.tsx
import './App.css';
import MyCV from '../component/MyCV';
import { type ResumeData } from '../interfaces/resumeData';
// Импортируем JSON как default
import resumeJson from '../data/resumeData.json';

function App() {
  // Приводим тип JSON данных к ResumeData
  const resumeData: ResumeData = resumeJson;

  return (
    <div className="App">
      <MyCV data={resumeData} />
    </div>
  );
}

export default App;