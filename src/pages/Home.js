import React from 'react'
import Widgets from '../components/TimeLog/Widgets';
import Drawer from '../components/Drawer/Drawer';



function Home() {

    return (
    <div className="Home" style={{ 
        paddingTop: '120px', 
        maxWidth: '1080px', 
        margin: '0 auto', 
        display: 'flex',
        justifyContent: 'space-evenly'
        }}>

            <Drawer />
            <div className="posts" style={{
                width: 390,
                height: 100,
                background: '#E2E2E2',
            }}>
            </div>
            <Widgets />
    </div>
    )
}

export default Home