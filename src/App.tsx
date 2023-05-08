import { useCalendar } from "./context/DatesContext";

function App() {
  const { calendar } = useCalendar();
  return (
    <div>
      <h1>{calendar.year}</h1>
    </div>
  );
}

export default App;
