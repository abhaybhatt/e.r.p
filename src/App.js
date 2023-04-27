import Dashboard from './utils/Dashboard.js';
import Main from './components/main/Main.js';
import ItemDetail from './components/itemDetail/ItemDetail.js';
import AddItem from './components/addItem/AddItem.js';
import InventoryTable from './components/table/Table.js'
import { Login } from './components/login/login.js';
import { Route, Routes } from "react-router-dom"
import './App.css';
import './index.css'


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard><Main /></Dashboard>} />
        <Route path="/table" element={<Dashboard type={2}><InventoryTable /></Dashboard>} />
        <Route path="/view/:id" element={<Dashboard type={2}><ItemDetail /></Dashboard>} />
        <Route path="/add-item" element={<Dashboard><AddItem /></Dashboard>} />
      </Routes>
    </>

  );
}

export default App;
