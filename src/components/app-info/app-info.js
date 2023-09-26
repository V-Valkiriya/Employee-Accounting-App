import './app-info.css';

const AppInfo = ({employees, increased}) => {
    return (
            <div className="app-info">
                <h1>Employees accounting in "N" company.</h1>
                <h2>Total numbers of employees: {employees}</h2>
                <h2>Apply for the award: {increased}</h2>
            </div>
    );
}

export default AppInfo;