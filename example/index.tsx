import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useDifferentAppUpdater from '../src';

const App = () => {
    const [isUpdateReady, onUpdate] = useDifferentAppUpdater("CityFood-desktop");

    return (
        <>
            {isUpdateReady &&
                <div
                    id="versionChecker"
                    onClick={() => onUpdate()}
                >
                    <p>
                        <b>Frissítés</b>
                        Új verzió érhető el, kattintson ide!
                    </p>
                </div>
            }
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
