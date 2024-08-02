import UserContext from "./components/AccountContext.jsx";
import ToggleColorMode from "./components/toggleColormode.jsx";
import Views from "./components/Views.jsx";

function App() {
  return (
    <UserContext>
      <Views />
      <ToggleColorMode />
    </UserContext>
  );
}

export default App;
