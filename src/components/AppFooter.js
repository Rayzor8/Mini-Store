
const AppFooter = () => {

    function getTodayhandler (){
        const stringDays = ['Sunday','Monday','Thuesday','Wednesday','Thursday','Friday','Saturday']
        return stringDays[new Date().getDay()]
    }

    return (
        <footer className="text-center py-2">
            <h1>This is footer &copy;rayflash : {getTodayhandler()} </h1>
        </footer>
    )
}

export default AppFooter
