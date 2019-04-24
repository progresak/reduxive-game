import React, {Component, Suspense} from 'react';
import HomeScreen from "./components/HomeScreen/HomeScreen";

const LazyWorld = React.lazy(() => import("./components/world/World"));
class App extends Component {

    state = {loggedIn: true};

    onPlayButtonClick = () => {
        this.setState({loggedIn: true})
    };

    render() {
        return (
            <div>
                {this.state.loggedIn ? (
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <LazyWorld />
                    </Suspense>
                    ) : (<HomeScreen onPlayButtonClick={this.onPlayButtonClick}/>)}
            </div>
        );
    }
}

export default App;