import React, {Component} from 'react'
import Clock from './Clock'
import Products from './Products'

class App extends Component {
    render() {
        return (
            <div className="App">
                
                <Clock/>

                <section>
                    <Products/>
                </section>
                

            </div>
        );
    }
}

export default App