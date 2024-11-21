import Header from './containers/Header/Header.tsx';
import ContactsPage from './containers/ContactsPage/ContactsPage.tsx';
import { Route, Routes } from 'react-router-dom';
import ContactsForm from './containers/ContactsForm/ContactsForm.tsx';


const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<ContactsPage />} />
      <Route path="/new" element={<ContactsForm />} />
    </Routes>
  </>
);

export default App
