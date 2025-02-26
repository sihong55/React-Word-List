import Day from './component/Day.tsx';
import DayList from './component/DayList.tsx';
import Header from './component/Header';
import EmptyPage from './component/EmptyPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import CreateWord from './component/CreateWord.tsx';
import CreateDay from './component/CreateDay';

function App() {
    return (

        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<DayList/>}/>
                    <Route path="/day/:day" element={<Day/>}/>
                    <Route path="/create_word" element={<CreateWord/>}/>
                    <Route path="/create_day" element={<CreateDay/>}/>
                    <Route path="*" element={<EmptyPage/>} />                    
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
