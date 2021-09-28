import React from 'react';
import Container from './components/pages/Container';
import "./styles/App.scss";

const App = () => {
  return ( 
    <div data-testid="app" className="min-vh-100 bg-offwhite">
      <Container />
    </div>
   );
}
 
export default App;