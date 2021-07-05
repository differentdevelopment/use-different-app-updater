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

describe('it', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
