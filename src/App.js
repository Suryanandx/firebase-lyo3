import LogIn from "./components/LogIn/LogIn";
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';
//import Sidebar from "./components/Sidebar/Sidebar";
import { Process, Reports } from "./Pages/Reports/Reports";
import Content from "./Pages/MachineContents/Content";
import './App.css'
import Machines from "./components/Machines/Machines";
import Sidebar from "./components/Sidebar/Sidebar";
import AddMachines from "./components/Machines/AddMachines";
import AddUser from "./components/AddUser/AddUser";
import Account from "./components/Account/Account";
import CustomerListView from "./components/LogsData/Logs";
import Steps from "./Pages/Steps/Steps";
import AddContent from "./Pages/MachineContents/AddContent";
import AddSteps from "./Pages/Steps/AddSteps";
import EditContent from "./Pages/MachineContents/EditContent";
import BatchListView from './Pages/Reports/BatchData/Logs'
import MiddlePage from "./Pages/MiddlePage/MiddlePage";
import AppRoute from "./routes/AppRoute";
import MainLayout from "./layouts/MainLayout/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Users from "./components/AddUser/Users";
import { AuthProvider } from "./components/context/AuthContext";
import ForgotPass from "./components/ForgotPass/ForgotPass";
import ContentsData from "./Pages/ContentsData/ContentsData";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Router>
      <Switch>
        <AppRoute path='/machine-data/:id/Reports' exact component={Reports} layout={MainLayout}/>
         <AppRoute path='/machine-data/reports/:id/Call-Logs' exact component={CustomerListView} layout={MainLayout} />
        <AppRoute path='/machine-data/reports/:id/Batch-Logs' exact component={BatchListView} layout={MainLayout} />
        <AppRoute path='/machine-data/reports/:id/process' exact component={Process} layout={MainLayout} />
        <AppRoute path='/machine-data/:id/Content' exact component={ContentsData} layout={MainLayout} />
        <AppRoute path="/machine-data/:id/Content/add-content" exact component={AddContent} layout={MainLayout}/>
        <AppRoute path="/machine-data" exact component={Machines} layout={MainLayout}/> 
        <AppRoute path="/add-machine" exact component={AddMachines} layout={MainLayout} />
        <Route path="/login" exact component={LogIn} />
        <Route path="/forgotPass" exact component={ForgotPass}/>
        <AppRoute path="/users/add-user" exact component={AddUser} layout={MainLayout}/>
        <AppRoute path="/account" exact component={Account} layout={MainLayout}/> 
        <AppRoute path="/machine-data/:id/:id/:id/steps" exact component={Steps} layout={MainLayout}/>
        <AppRoute path="/steps/:id/add-step" exact component={AddSteps} layout={MainLayout}/>
        <AppRoute path="/" exact component={MiddlePage} layout={MainLayout}/>
        <AppRoute path="/users" exact component={Users} layout={MainLayout}/>
      </Switch>
    </Router> 
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
