import { useCalendar } from "./context/DatesContext";

function App() {
  const { calendar } = useCalendar();
  return <h1>{calendar.year}</h1>;
}

export default App;
