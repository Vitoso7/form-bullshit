// import './App.css'

import { Container } from "@mui/system";
import { Form } from "react-final-form";

function App() {
  return (
    <Container>
      <h1 className="bg-teal-400 font-semibold p-2">Edit your Profile</h1>
      <Form onSubmit={() => {}} render={<h1>test</h1>} />
    </Container>
  );
}

export default App;
