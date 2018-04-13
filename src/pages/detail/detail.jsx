import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

class Detail extends React.Component {
    render() {
        return (
            <div>
                this is detail page!
            </div>
        );
    }
}

render(
    <AppContainer>
        <Detail></Detail>
    </AppContainer>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept();
}
