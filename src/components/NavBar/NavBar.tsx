import React from "react";
import s from './NavBar.module.css'
import {Applications} from "./componentsNavBar/applications/Applications";
import {Friends} from "./componentsNavBar/friends/Friends";
import {Messages} from "./componentsNavBar/messages/Messages";
import {Music} from "./componentsNavBar/music/Music";
import {News} from "./componentsNavBar/news/News";
import {Videos} from "./componentsNavBar/videos/Videos";
import {BrowserRouter, Route} from "react-router-dom";

export const NavBar = () => {
    return (
        <BrowserRouter>
            <div className={s.navBar}>
                {/*<News />*/}
                {/*<Messages/>*/}
                {/*<Friends/>*/}
                {/*<Music/>*/}
                {/*<Videos/>*/}
                {/*<Applications/>*/}
            </div>
        </BrowserRouter>

    )
}

// <Route path='./news' component={News} />
// <Route path='./message' component={Messages} />
// <Route path='./friends' component={Friends} />
// <Route path='./music' component={Music} />
// <Route path='./videos' component={Videos} />
// <Route path='./applications' component={Applications} />
