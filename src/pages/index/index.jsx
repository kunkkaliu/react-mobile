import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import styles from './index.less';

class Index extends React.Component {
    render() {
        return (
            <div className={styles.app}>
                this is index page!
            </div>
        );
    }
}
render(
    <AppContainer>
        <Index></Index>
    </AppContainer>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept();
}
